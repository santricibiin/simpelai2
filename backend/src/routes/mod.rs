use axum::Json;
use serde_json::{json, Value};

pub async fn models() -> Json<Value> {
    Json(json!({
        "object": "list",
        "data": [
            { "id": "the-model-5", "object": "model", "owned_by": "emberai" },
            { "id": "gpt-5.6-sol", "object": "model", "owned_by": "emberai" },
            { "id": "glm-5.3", "object": "model", "owned_by": "emberai" },
        ]
    }))
}

pub async fn chat(Json(body): Json<Value>) -> Json<Value> {
    let model = body["model"].as_str().unwrap_or("the-model-5");
    Json(json!({
        "id": "chatcmpl_mock",
        "object": "chat.completion",
        "model": model,
        "choices": [{
            "message": { "role": "assistant", "content": "Proxied through EmberAI." },
            "index": 0,
            "finish_reason": "stop"
        }]
    }))
}
