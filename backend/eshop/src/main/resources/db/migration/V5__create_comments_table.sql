CREATE TABLE comments
(
    id                          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    text                        text NOT NULL,
    user_id                     BIGINT,
    product_id                  BIGINT,
    date                        TIMESTAMPTZ,
    CONSTRAINT comments_pk      PRIMARY KEY (id),
    FOREIGN KEY(user_id) 
      REFERENCES users(id),
    FOREIGN KEY(product_id) 
      REFERENCES products(id)
);

CREATE TABLE reactions
(
    id                          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    status                      varchar(255) NOT NULL,
    user_id                     BIGINT,
    comment_id                  BIGINT,
    CONSTRAINT reactions_pk     PRIMARY KEY (id),
    FOREIGN KEY(user_id) 
      REFERENCES users(id),
    FOREIGN KEY(comment_id) 
      REFERENCES comments(id)
);

insert into "comments" ("date", "id", "product_id", "text", "user_id") values ('2023-04-15 10:54:17.851+00', '2', '1', 'testas', '2');
insert into "comments" ("date", "id", "product_id", "text", "user_id") values ('2023-04-15 10:54:21.384+00', '3', '1', 'antras', '2');
insert into "comments" ("date", "id", "product_id", "text", "user_id") values ('2023-04-15 10:54:23.702+00', '4', '1', 'trecias', '2');

SELECT SETVAL('public.comments_id_seq', COALESCE(MAX(id), 1) ) FROM public.comments;

insert into "reactions" ("comment_id", "id", "status", "user_id") values ('4', '2', 'LIKE', '2');
insert into "reactions" ("comment_id", "id", "status", "user_id") values ('3', '3', 'DISLIKE', '2');
insert into "reactions" ("comment_id", "id", "status", "user_id") values ('4', '4', 'LIKE', '1');
insert into "reactions" ("comment_id", "id", "status", "user_id") values ('3', '5', 'DISLIKE', '1');
insert into "reactions" ("comment_id", "id", "status", "user_id") values ('2', '6', 'LIKE', '1');

SELECT SETVAL('public.reactions_id_seq', COALESCE(MAX(id), 1) ) FROM public.reactions;