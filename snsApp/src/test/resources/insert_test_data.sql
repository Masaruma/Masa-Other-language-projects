TRUNCATE TABLE comments, posts, users;
--TRUNCATE TABLE users;
--TRUNCATE TABLE posts;
--TRUNCATE TABLE comments;

INSERT INTO users VALUES (1, 'john', 'Hello World', 'Aichi');
INSERT INTO users VALUES (2, 'Keita', 'Good Morning', 'Gifu');
INSERT INTO users VALUES (3, 'Harry Potter', 'Good Morning', 'Mie');
INSERT INTO users VALUES (4, 'Shinpachi', 'Good Morning', 'Shizuoka');
INSERT INTO users VALUES (5, 'Masa', 'Good Morning', 'Gifu');
INSERT INTO posts VALUES (1, 1, '2024-04-01 08:30:00', '今日は頭が痛い。', 2);
INSERT INTO posts VALUES (2, 2, '2024-04-02 08:30:00', 'johnとテニスしたった。', 2);
INSERT INTO posts VALUES (3, 1, '2024-04-03 08:30:00', '明日から授業始まり。憂鬱。', 2);
INSERT INTO posts VALUES (4, 3, '2024-04-02 09:30:00', 'ヴォルデモートまじ許さん。', 10);
INSERT INTO posts VALUES (5, 4, '2024-04-02 09:40:00', 'johnと登山したった。', 3);
INSERT INTO comments VALUES (1, 2, 2, '2024-04-01 08:40:00', '大丈夫！？', 3);
INSERT INTO comments VALUES (2, 2, 3, '2024-04-01 08:40:00', 'あいつは大丈夫だろ。', 3);
INSERT INTO comments VALUES (3, 4, 1, '2024-04-03 08:40:00', 'また行こう！', 3);
