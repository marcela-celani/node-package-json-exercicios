-- Active: 1695686908483@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users VALUES ('u001', 'Patricia Coelho', 'patriciacoelho@gmail.com', 'Fr6H45', '25/09/2023');
INSERT INTO users VALUES ('u002', 'Andreia Laura', 'andreialaura@gmail.com', 'b53bT?4@', '25/09/2023');
INSERT INTO users VALUES ('u003', 'Eduardo Camelo', 'educamelo@gmail.com', ',3J39xnU', '25/09/2023');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description  TEXT NOT NULL,
    image_url  TEXT NOT NULL
);

SELECT * FROM products;

DROP TABLE products;

INSERT INTO products VALUES ('p001', 'Fire TV Stick Lite', 284.05, 'Fire TV Stick Lite | Streaming em Full HD com Alexa | Com Controle Remoto Lite por Voz com Alexa (sem controles de TV)', 'https://m.media-amazon.com/images/I/41XUvigLn0L._AC_SY355_.jpg');

INSERT INTO products VALUES ('p002', 'Echo Show', 539.10, 'Echo Show 5 (2ª Geração): Smart Display de 5" com Alexa e câmera de 2 MP - Cor Azul', 'https://m.media-amazon.com/images/I/71wSK5GhXRS._AC_SX522_.jpg');

INSERT INTO products VALUES ('p003', 'Echo DOt', 386.10, 'Novo Echo Dot 5ª geração | O Echo Dot com o melhor som já lançado | Cor Preta', 'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX522_.jpg');