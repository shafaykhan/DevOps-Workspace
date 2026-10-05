CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;


DROP TABLE IF EXISTS todo;
CREATE TABLE todo
(
      id          INT AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(200)  NOT NULL,
      description VARCHAR(1000) NULL,
      completed   BIT(1)        NOT NULL DEFAULT FALSE,
      created_at  DATETIME      NOT NULL,
      updated_at  DATETIME      NOT NULL
);
