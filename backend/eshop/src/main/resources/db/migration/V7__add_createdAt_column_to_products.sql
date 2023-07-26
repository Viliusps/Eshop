ALTER TABLE products
ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

UPDATE products
SET created_at = '2023-05-09 20:30:40.803148+00'
WHERE id = 1;

UPDATE products
SET created_at = '2023-05-08 20:30:40.803148+00'
WHERE id = 2;

UPDATE products
SET created_at = '2023-05-08 21:30:40.803148+00'
WHERE id = 3;

UPDATE products
SET created_at = '2023-05-07 20:30:40.803148+00'
WHERE id = 4;

UPDATE products
SET created_at = '2023-05-04 20:30:40.803148+00'
WHERE id = 5;

UPDATE products
SET created_at = '2023-05-05 20:30:40.803148+00'
WHERE id = 6;