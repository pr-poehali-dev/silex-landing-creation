import json
import os
import psycopg2  # psycopg2-binary

SCHEMA = "t_p6463740_silex_landing_creati"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Админ-панель: список, одобрение и удаление отзывов"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    password = (event.get("headers") or {}).get("x-admin-password", "")
    if password != os.environ.get("ADMIN_PASSWORD", ""):
        return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Нет доступа"})}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    conn = get_conn()
    cur = conn.cursor()

    if method == "GET":
        cur.execute(
            f"SELECT id, author, company, role, text, stars, approved, created_at FROM {SCHEMA}.reviews ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        reviews = [
            {
                "id": r[0],
                "author": r[1],
                "company": r[2] or "",
                "role": r[3] or "",
                "text": r[4],
                "stars": r[5],
                "approved": r[6],
                "created_at": r[7].strftime("%d.%m.%Y %H:%M") if r[7] else "",
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": reviews})}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        review_id = body.get("id")
        action = body.get("action")
        if action == "approve":
            cur.execute(f"UPDATE {SCHEMA}.reviews SET approved = TRUE WHERE id = %s", (review_id,))
        elif action == "reject":
            cur.execute(f"UPDATE {SCHEMA}.reviews SET approved = FALSE WHERE id = %s", (review_id,))
        elif action == "delete":
            cur.execute(f"DELETE FROM {SCHEMA}.reviews WHERE id = %s", (review_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    cur.close()
    conn.close()
    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
