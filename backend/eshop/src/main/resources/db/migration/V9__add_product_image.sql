ALTER TABLE products
ADD COLUMN image_url VARCHAR(255) DEFAULT '';

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/1'
WHERE id = 1;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/2'
WHERE id = 2;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/3'
WHERE id = 3;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/4'
WHERE id = 4;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/5'
WHERE id = 5;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/6'
WHERE id = 6;

UPDATE products
SET image_url = 'backend/eshop/src/main/resources/assets/products/7'
WHERE id = 7;