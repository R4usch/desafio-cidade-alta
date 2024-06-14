create database cidadealta;
use cidadealta;
create table emblems(id int not null, slug text, name text, image text);
create table users(id int not null AUTO_INCREMENT, name text, token text, role text not null default ('DEFAULT'), PRIMARY KEY (id));
create table emblems_inventory(id int not null auto_increment, emblem_id int not null, user_id int not null, redeem_at date not null, equipped BOOL default 0, primary key (id) );
ALTER TABLE `emblems_inventory`
  CHANGE `redeem_at` `redeem_at` DATETIME DEFAULT CURRENT_TIMESTAMP ;


# Usuários
insert into users(name, token) values('Tonhão',  '1919463');
insert into users(name, token) values('João',    '5107163');
insert into users(name, token, role) values('Cabrito', '3027849', 'ADMIN');

# Emblemas
insert into emblems(id, slug, name, image) values (1, 'cda', 'Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png');
insert into emblems(id, slug, name, image) values (2, 'cda-valley', 'Cidade Alta Valley', 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png');
insert into emblems(id, slug, name, image) values (3, 'policia', 'Policia do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/policia.png');
insert into emblems(id, slug, name, image) values (4, 'hospital', 'Hospital do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/hospital.png');
insert into emblems(id, slug, name, image) values (5, 'mecanica', 'Mecânica do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/mecanica.png');
insert into emblems(id, slug, name, image) values (6, 'taxi', 'Taxi do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/taxi.png');
insert into emblems(id, slug, name, image) values (7, 'coruja', 'Coruja', 'https://cidadealtarp.com/imagens/challenge/coruja.png');
insert into emblems(id, slug, name, image) values (8, 'hiena', 'Hiena', 'https://cidadealtarp.com/imagens/challenge/hiena.png');
insert into emblems(id, slug, name, image) values (9, 'gato', 'Gato', 'https://cidadealtarp.com/imagens/challenge/gato.png');
insert into emblems(id, slug, name, image) values (10, 'urso', 'Urso', 'https://cidadealtarp.com/imagens/challenge/urso.png');