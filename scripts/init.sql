-- initdb/init.sql
CREATE TABLE IF NOT EXISTS tb_game (
    id uuid DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO public.tb_game (title) VALUES
('The Legend of Zelda: Breath of the Wild'),
('Super Mario Odyssey'),
('The Witcher 3: Wild Hunt')

