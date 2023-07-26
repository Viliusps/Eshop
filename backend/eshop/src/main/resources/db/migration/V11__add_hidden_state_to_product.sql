ALTER TABLE products
ADD COLUMN hidden BOOLEAN DEFAULT false;

UPDATE products
SET hidden = true
WHERE id = 7;