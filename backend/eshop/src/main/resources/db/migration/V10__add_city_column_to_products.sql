ALTER TABLE products
ADD COLUMN city VARCHAR(255) DEFAULT '';

UPDATE products
SET city = 'Kaunas'
WHERE id = 1;

UPDATE products
SET city = 'Vilnius'
WHERE id = 2;

UPDATE products
SET city = 'Vilnius'
WHERE id = 3;

UPDATE products
SET city = 'Šiauliai'
WHERE id = 4;

UPDATE products
SET city = 'Panevėžys'
WHERE id = 5;

UPDATE products
SET city = 'Kaunas'
WHERE id = 6;

UPDATE products
SET city = 'Klaipėda'
WHERE id = 7;