ALTER TABLE products   
ADD COLUMN category VARCHAR(255)  NOT NULL DEFAULT 'OTHER';

UPDATE products
SET category = 'PHONES'
WHERE id = 1;

UPDATE products
SET category = 'COMPUTERS'
WHERE id = 2;

UPDATE products
SET category = 'COMPUTER_PARTS'
WHERE id = 3;

UPDATE products
SET category = 'COMPUTER_PARTS'
WHERE id = 4;

UPDATE products
SET category = 'COMPUTER_PARTS'
WHERE id = 5;

UPDATE products
SET category = 'CHARGERS'
WHERE id = 6;

UPDATE products
SET category = 'PHONES'
WHERE id = 7;