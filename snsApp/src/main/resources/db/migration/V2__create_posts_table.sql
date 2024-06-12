CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP,
    content TEXT,
    good INT
)
