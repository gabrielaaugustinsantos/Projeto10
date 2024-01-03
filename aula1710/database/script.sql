create database avaliacao01;
use avaliacao01;
create table servidor (
    numero_matricula int not null,
    nome varchar(100),
    cargo varchar(50),
    primary key(numero_matricula)
);
create table material (
    id int not null AUTO_INCREMENT,
    nome varchar(100),
    descricao text,
    preco_unitario float,
    unidade varchar(10),
    primary key(id)
);
create table compra (
    id int not null AUTO_INCREMENT,
    quantidade int,
    urgencia varchar(12),
    id_material int not null,
    numero_matricula_servidor int not null,
    primary key(id),
    foreign key (id_material) references material(id),
    foreign key (numero_matricula_servidor) references servidor(numero_matricula)
);