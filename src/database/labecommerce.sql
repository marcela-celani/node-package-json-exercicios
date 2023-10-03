-- Active: 1695859276783@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;
UPDATE users SET email='fernandacanudo@gmail.com' WHERE id='u002';

DROP TABLE users;

INSERT INTO users VALUES 
('u001', 'Patricia Coelho', 'patriciacoelho@gmail.com', 'Fr6H45', '25/09/2023'),
('u002', 'Andreia Laura', 'andreialaura@gmail.com', 'b53bT?4@', '25/09/2023'),
('u003', 'Eduardo Camelo', 'educamelo@gmail.com', ',3J39xnU', '25/09/2023');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description  TEXT NOT NULL,
    image_url  TEXT NOT NULL
);

SELECT * FROM products;
SELECT * FROM products WHERE name LIKE '%tv%';

DROP TABLE products;

INSERT INTO products VALUES 
('p001', 'Fire TV Stick Lite', 284.05, 'Fire TV Stick Lite | Streaming em Full HD com Alexa | Com Controle Remoto Lite por Voz com Alexa (sem controles de TV)', 'https://m.media-amazon.com/images/I/41XUvigLn0L._AC_SY355_.jpg'),
('p002', 'Echo Show', 539.10, 'Echo Show 5 (2ª Geração): Smart Display de 5" com Alexa e câmera de 2 MP - Cor Azul', 'https://m.media-amazon.com/images/I/71wSK5GhXRS._AC_SX522_.jpg'),
('p003', 'Echo DOt', 386.10, 'Novo Echo Dot 5ª geração | O Echo Dot com o melhor som já lançado | Cor Preta', 'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX522_.jpg');

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at   TEXT NOT NULL,
    FOREIGN KEY(buyer) REFERENCES users(id) 
);

INSERT INTO purchases VALUES
('b001', 'u001', 129.90, DATETIME()),
('b002', 'u002', 39.90, DATETIME()),
('b003', 'u003', 149.90, DATETIME());

UPDATE purchases SET total_price = 39.99, created_at = strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime') WHERE id = 'b002'

SELECT * FROM purchases;

DROP TABLE purchases;
DELETE FROM purchases;

SELECT purchases.id, users.id, users.name, users.email, purchases.total_price, purchases.created_at FROM purchases INNER JOIN users ON users.id = purchases.buyer;