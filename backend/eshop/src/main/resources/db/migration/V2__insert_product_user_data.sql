INSERT INTO roles (role) VALUES
('USER'),
('ADMIN');

INSERT INTO users (id,username,email,password,phone, role)
VALUES (1, 'testAdmin', 'testAdmin@gmail.com', '$2a$10$ZLPv4sv5n7DE6aIF6ZAgyuxOQJbpW8OSFGcn5v1uyAJ/7ugRRmoMK', '+123456789', 'ADMIN');
INSERT INTO users (id,username,email,password,phone, role)
VALUES (2, 'testUser', 'testUser@gmail.com', '$2a$10$X76wy2bATaK4LHXT6KOORu3aRJyfoj49ZBgNuSjtUPiCktaYBkRDS', '+123456789', 'USER');

SELECT SETVAL('public.users_id_seq', COALESCE(MAX(id), 1) ) FROM public.users;

INSERT INTO products (id,name,status,description,price,user_id)
VALUES(1,'Telefonas','Naudota','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',150,1);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(2,'Kompiuteris','Nauja','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',1000,1);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(3,'Vaizdo plokštė','Mažai naudota','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',800,2);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(4,'Vaizdo plokštė','Nauja','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',600,2);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(5,'Vaizdo plokštė','Naudota','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',600,2);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(6,'USB-C laidas','Mažai naudota','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',10,1);
INSERT INTO products (id,name,status,description,price,user_id)
VALUES(7,'Iphone X','Naudota','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',120,1);

SELECT SETVAL('public.products_id_seq', COALESCE(MAX(id), 1) ) FROM public.products;