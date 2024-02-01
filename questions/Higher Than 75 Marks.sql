create database sqlquestion;
use sqlquestion;
drop database sqlquestion;
CREATE TABLE Students (Id INT PRIMARY KEY,Name VARCHAR(255),Marks INT);
INSERT INTO Students (Id, Name, Marks) VALUES (1, 'Student1', 45);
INSERT INTO Students (Id, Name, Marks) VALUES (2, 'Student2', 78);
INSERT INTO Students (Id, Name, Marks) VALUES (3, 'Student3', 60);
INSERT INTO Students (Id, Name, Marks) VALUES (4, 'Student4', 35);
INSERT INTO Students (Id, Name, Marks) VALUES (5, 'Student5', 90);
INSERT INTO Students (Id, Name, Marks) VALUES (6, 'Student6', 65);
INSERT INTO Students (Id, Name, Marks) VALUES (7, 'Student7', 80);
INSERT INTO Students (Id, Name, Marks) VALUES (8, 'Student8', 42);
INSERT INTO Students (Id, Name, Marks) VALUES (9, 'Student9', 55);
INSERT INTO Students (Id, Name, Marks) VALUES (10, 'Student10', 70);
select * from students;

SELECT * FROM Students WHERE Marks > 75 ORDER BY Marks DESC;

