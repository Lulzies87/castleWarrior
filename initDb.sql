CREATE SCHEMA IF NOT EXISTS castleWarrior;

CREATE TABLE IF NOT EXISTS castleWarrior.users (
nickname VARCHAR(50) PRIMARY KEY,
password VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS castleWarrior.playerData (
id INT AUTO_INCREMENT PRIMARY KEY,
nickname VARCHAR(50) UNIQUE,
hp INT CHECK (hp>= 0 AND hp <= 100),
score INT,
highscore INT,
FOREIGN KEY (nickname) REFERENCES users(nickname)
);

CREATE TABLE IF NOT EXISTS castleWarrior.maps (
mapName VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS castleWarrior.collisions (
mapName VARCHAR(50),
x SMALLINT NOT NULL,
y SMALLINT NOT NULL,
FOREIGN KEY (mapName) REFERENCES maps(mapName)
);
