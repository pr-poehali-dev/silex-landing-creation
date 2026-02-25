import json
import os
import psycopg2  # psycopg2-binary

SCHEMA = "t_p6463740_silex_landing_creati"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, author, company, role, text, stars, created_at FROM {SCHEMA}.reviews WHERE approved = TRUE ORDER BY created_at DESC LIMIT 20"
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
                "created_at": r[6].isoformat() if r[6] else "",
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": reviews})}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author = (body.get("author") or "").strip()
        company = (body.get("company") or "").strip()
        role = (body.get("role") or "").strip()
        text = (body.get("text") or "").strip()
        stars = int(body.get("stars") or 0)

        if not author or not text or stars < 1 or stars > 5:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Заполните все обязательные поля"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.reviews (author, company, role, text, stars) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (author, company, role, text, stars)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "id": new_id})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}