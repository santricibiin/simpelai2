# EmberAI — Project Rules

## Database (WAJIB)

**Semua fitur baru SELALU pakai MySQL.** Jangan pakai SQLite, Postgres, file JSON, atau in-memory storage untuk data persisten.

- DB: `emberai` @ 127.0.0.1:3306, user `emberai`, password `emberai_db_secret_2026`
- Backend: Rust axum + **sqlx** (parameterized query saja — anti SQLi)
- Credential string: `mysql://emberai:emberai_db_secret_2026@127.0.0.1:3306/emberai`
  (sudah ada di `backend/src/db.rs` sebagai `DB_URL`)
- Buat/migrasi tabel di `backend/src/db.rs::init()` (pattern: `CREATE TABLE IF NOT EXISTS`)

## Ports & Run

- Frontend: `npm run dev` di `frontend/` (port 3001)
- Backend: `cargo run` di `backend/` (port 8080)
- **JANGAN kill port 20128** (9router)
- Jangan `next build`; pakai `npm run dev` saja

## Security

- Password: argon2 hash (`backend/src/auth.rs::hash_password`)
- Auth: JWT Bearer (HS256), middleware `auth_middleware`
- Rate limit login: 5 percobaan/menit/IP (sliding window)
- Security headers middleware aktif (CSP, X-Frame-Options, dst.)
- Semua query MySQL wajib parameterized (`.bind()`)

## Admin

- Login: `/admin/login` (default: admin / admin123 — ganti!)
- Dashboard: `/admin` (layout vertical/horizontal, toggle di Settings FAB gear kanan tengah, localStorage key `adminLayout`)
