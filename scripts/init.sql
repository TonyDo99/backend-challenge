-- initdb/init.sql
CREATE TABLE IF NOT EXISTS game_title (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL
);

INSERT INTO game_title (title, genre) VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-adventure'),
('Super Mario Odyssey', 'Platformer'),
('The Witcher 3: Wild Hunt', 'Action RPG');


-- initdb/init.sql
CREATE TABLE IF NOT EXISTS game_title (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL
);

INSERT INTO game_title (title, genre) VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-adventure'),
('Super Mario Odyssey', 'Platformer'),
('The Witcher 3: Wild Hunt', 'Action RPG');
