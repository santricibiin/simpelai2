use axum::{
    body::Body,
    extract::State,
    http::{HeaderMap, Request, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{get, post},
    Router,
};
use sqlx::MySqlPool;
use std::{
    collections::HashMap,
    net::SocketAddr,
    sync::{Arc, Mutex},
    time::{Duration, Instant},
};
use tokio::net::TcpListener;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

mod auth;
mod db;
mod routes;

#[derive(Clone)]
struct AppState {
    pool: MySqlPool,
    limiter: Arc<Mutex<HashMap<String, Vec<Instant>>>>,
}

const RATE_LIMIT: usize = 5;
const RATE_WINDOW: Duration = Duration::from_secs(60);

fn client_ip(headers: &HeaderMap, addr: Option<SocketAddr>) -> String {
    headers
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .map(|v| v.to_string())
        .unwrap_or_else(|| {
            addr.map(|a| a.ip().to_string()).unwrap_or_else(|| "unknown".into())
        })
}

// sliding-window rate limiter — blocks brute force on login
async fn rate_limit_mw(
    State(state): State<AppState>,
    headers: HeaderMap,
    req: Request<Body>,
    next: Next,
) -> Response {
    let path = req.uri().path().to_string();
    let ip = client_ip(&headers, None);

    if path == "/admin/login" {
        let mut limiter = state.limiter.lock().unwrap();
        let now = Instant::now();
        let window = limiter.entry(format!("login:{ip}")).or_default();
        window.retain(|t| now.duration_since(*t) < RATE_WINDOW);
        if window.len() >= RATE_LIMIT {
            return (
                StatusCode::TOO_MANY_REQUESTS,
                "too many attempts — try again in a minute",
            )
                .into_response();
        }
        window.push(now);
    }
    next.run(req).await
}

// security headers — anti-XSS hardening
async fn security_headers_mw(req: Request<Body>, next: Next) -> Response {
    let mut res = next.run(req).await;
    let h = res.headers_mut();
    h.insert("X-Content-Type-Options", "nosniff".parse().unwrap());
    h.insert("X-Frame-Options", "DENY".parse().unwrap());
    h.insert("X-XSS-Protection", "1; mode=block".parse().unwrap());
    h.insert(
        "Referrer-Policy",
        "strict-origin-when-cross-origin".parse().unwrap(),
    );
    h.insert(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:"
            .parse()
            .unwrap(),
    );
    res
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().with_env_filter("info").init();

    let pool = db::init().await;
    let state = AppState { pool: pool.clone(), limiter: Arc::new(Mutex::new(HashMap::new())) };

    let admin_routes = Router::new()
        .route("/me", get(auth::me))
        .route("/stats", get(auth::stats))
        .route("/logins", get(auth::recent_logins))
        .layer(middleware::from_fn_with_state(state.clone(), auth::auth_middleware));

    let app = Router::new()
        .route("/v1/models", get(routes::models))
        .route("/v1/chat/completions", post(routes::chat))
        .route("/", get(|| async { "EmberAI API" }))
        .route("/admin/login", post(auth::login))
        .nest("/admin/api", admin_routes)
        .layer(middleware::from_fn_with_state(state.clone(), rate_limit_mw))
        .layer(middleware::from_fn(security_headers_mw))
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    tracing::info!("listening on {}", addr);
    axum::serve(TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}
