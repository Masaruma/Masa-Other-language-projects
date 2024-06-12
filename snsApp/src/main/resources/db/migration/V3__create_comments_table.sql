CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at_c TIMESTAMP,
    content_c TEXT,
    good_c INT
)