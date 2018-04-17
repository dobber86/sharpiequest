create database sharpiequest;

create table players (
  id integer primary key auto_increment,
  username varchar(255) not null unique, 
  password varchar(255) not null,
  hp int(3),
  maxhp int(3),
  mp int(3),
  maxmp int(3),
  power int(3),
  resistance int(3),
  accuracy int(3),
  insight int(3),
  specialpower int(3),
  xp int(3),
  level int(3),
  money int(3)
);

delete from players where id between 60 and 68;