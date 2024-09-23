create database socialmedia;

create table users(
    id bigserial not null,
    name text,
    age int
);

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