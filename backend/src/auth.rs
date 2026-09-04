use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use axum::{
    body::Body,
    extract::State,
    http::{header, HeaderMap, Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Json, Response},
    Extension,
};use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

const JWT_SECRET: &[u8] = b"emberai-jwt-secret-change-in-prod-2026";

#[derive(Deserialize)]
pub struct LoginBody {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize)]
struct LoginResponse {
    token: String,
    username: String,
}

pub fn hash_password(password: &str) -> String {
    let salt = SaltString::generate(&mut OsRng);
    Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .expect("argon2 hash failed")
        .to_string()
}

fn verify_password(hash: &str, password: &str) -> bool {
    PasswordHash::new(hash)
        .and_then(|parsed| Argon2::default().verify_password(password.as_bytes(), &parsed))
        .is_ok()
}

// ponytail: single static secret; move to env var when deploying
fn sign_token(username: &str) -> String {
    let exp = chrono::Utc::now().timestamp() as usize + 8 * 3600;
    encode(
        &Header::default(),
        &Claims { sub: username.to_string(), exp },
        &EncodingKey::from_secret(JWT_SECRET),
    )
    .expect("jwt sign failed")
}

pub fn verify_token(token: &str) -> Option<Claims> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::default(),
    )
    .ok()
    .map(|d| d.claims)
}

// Input validation at trust boundary: username must be short alphanumeric+underscore.
fn valid_username(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 64
        && s.chars().all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-')
}

pub async fn login(
    State(state): State<crate::AppState>,
    headers: HeaderMap,
    Json(body): Json<LoginBody>,
) -> Response {
    let ip = headers
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("direct")
        .split(',')
        .next()
        .unwrap_or("")
        .trim()
        .to_string();

    if !valid_username(&body.username) || body.password.len() > 128 {
        return (StatusCode::BAD_REQUEST, "invalid credentials format").into_response();
    }

    let row: Option<(String,)> =
        sqlx::query_as("SELECT password_hash FROM admins WHERE username = ?")
            .bind(&body.username)
            .fetch_optional(&state.pool)
            .await
            .unwrap_or(None);

    let ok = row
        .as_ref()
        .map(|(hash,)| verify_password(hash, &body.password))
        .unwrap_or(false);

    // parameterized insert — SQLi safe
    sqlx::query("INSERT INTO login_logs (username, ip, success) VALUES (?, ?, ?)")
        .bind(&body.username)
        .bind(&ip)
        .bind(ok)
        .execute(&state.pool)
        .await
        .ok();

    if !ok {
        return (StatusCode::UNAUTHORIZED, "invalid username or password").into_response();
    }

    (
        StatusCode::OK,
        Json(LoginResponse { token: sign_token(&body.username), username: body.username }),
    )
        .into_response()
}

pub async fn me(claims: Extension<Claims>) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "username": claims.sub }))
}

#[derive(sqlx::FromRow, Serialize)]
pub struct LoginLog {
    pub id: u32,
    pub username: String,
    pub ip: String,
    pub success: bool,
    pub created_at: chrono::NaiveDateTime,
}

pub async fn recent_logins(
    State(state): State<crate::AppState>,
    _claims: Extension<Claims>,
) -> Response {
    let logs: Vec<LoginLog> =
        sqlx::query_as("SELECT id, username, ip, success, CAST(created_at AS DATETIME) AS created_at FROM login_logs ORDER BY id DESC LIMIT 20")
            .fetch_all(&state.pool)
            .await
            .unwrap_or_else(|e| {
                tracing::error!("login_logs query failed: {e}");
                Vec::new()
            });
    (StatusCode::OK, Json(logs)).into_response()
}

#[derive(sqlx::FromRow, Serialize)]
pub struct Stats {
    pub admins: i64,
    pub login_attempts: i64,
    pub failed_logins: i64,
}

pub async fn stats(State(state): State<crate::AppState>, _claims: Extension<Claims>) -> Response {
    let admins: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM admins")
        .fetch_one(&state.pool)
        .await
        .unwrap_or(0);
    let login_attempts: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM login_logs")
        .fetch_one(&state.pool)
        .await
        .unwrap_or(0);
    let failed_logins: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM login_logs WHERE success = 0")
            .fetch_one(&state.pool)
            .await
            .unwrap_or(0);
    (
        StatusCode::OK,
        Json(Stats { admins, login_attempts, failed_logins }),
    )
        .into_response()
}

pub async fn auth_middleware(
    State(_): State<crate::AppState>,
    headers: HeaderMap,
    mut req: Request<Body>,
    next: Next,
) -> Response {
    let token = headers
        .get(header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "));

    match token.and_then(verify_token) {
        Some(claims) => {
            req.extensions_mut().insert(claims);
            next.run(req).await
        }
        None => (StatusCode::UNAUTHORIZED, "unauthorized").into_response(),
    }
}
