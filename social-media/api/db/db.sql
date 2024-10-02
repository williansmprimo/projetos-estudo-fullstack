create database socialmedia;

create table users(
    id bigserial not null primary key,
    name text,
    age int
);

CREATE SEQUENCE users_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000;

insert into users values(
    default,
    'willians',
    30
);

create table posts(
    id bigserial not null,
    post_text text not null,
    creation_time timestamp not null,
    user_id bigint not null references users(id)
);

CREATE SEQUENCE posts_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000;

create table followers(
    id bigserial not null,
    user_id bigint not null references users(id),
    follower_id bigint not null references users(id)
);

CREATE SEQUENCE followers_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000;