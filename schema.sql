DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO students (id, name) VALUES
('1', 'Alice'),
('2', 'Bob'),
('3', 'Carolina'),
('4', 'David'),
('5', 'Emma');
