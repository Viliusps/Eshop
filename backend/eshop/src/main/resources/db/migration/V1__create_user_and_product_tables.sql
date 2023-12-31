CREATE TABLE roles
(
    role varchar(100) NOT NULL PRIMARY KEY
);

CREATE TABLE users
(
    id          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    username    varchar(30) NOT NULL,
    email       varchar(50) NOT NULL,
    password    varchar(70) NOT NULL,
    phone       varchar(20) NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id),
    role     varchar(100) NOT NULL,
    FOREIGN KEY(role) 
      REFERENCES roles(role)
);

CREATE TABLE products
(
    id                          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name                        varchar(30) NOT NULL,
    status                      varchar(20) NOT NULL,
    description                 text NOT NULL,
    price                       float NOT NULL,
    user_id                     BIGINT,
    CONSTRAINT products_pk      PRIMARY KEY (id),
    FOREIGN KEY(user_id) 
      REFERENCES users(id)
);