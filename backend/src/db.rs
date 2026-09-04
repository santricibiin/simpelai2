use sqlx::mysql::MySqlPoolOptions;
use sqlx::MySqlPool;
use std::time::Duration;

pub const DB_URL: &str = "mysql://emberai:emberai_db_secret_2026@127.0.0.1:3306/emberai";

pub async fn init() -> MySqlPool {
    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(5))
        .connect(DB_URL)
        .await
        .expect("failed to connect to MySQL");

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS admins (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(64) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
    )
    .execute(&pool)
    .await
    .expect("failed to create admins table");

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS login_logs (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(64) NOT NULL,
            ip VARCHAR(45) NOT NULL,
            success TINYINT(1) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
    )
    .execute(&pool)
    .await
    .expect("failed to create login_logs table");

    seed_admin(&pool).await;
    pool
}

async fn seed_admin(pool: &MySqlPool) {
    let exists: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM admins WHERE username = ?")
            .bind("admin")
            .fetch_one(pool)
            .await
            .unwrap_or(0);
    if exists == 0 {
        let hash = crate::auth::hash_password("admin123");
        sqlx::query("INSERT INTO admins (username, password_hash) VALUES (?, ?)")
            .bind("admin")
            .bind(&hash)
            .execute(pool)
            .await
            .expect("failed to seed admin");
        tracing::warn!("seeded default admin (admin / admin123) — change this password!");
    }
}
