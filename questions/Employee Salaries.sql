create database sqlquestion;
use sqlquestion;
drop database sqlquestion;
CREATE TABLE Employee (employee_id INT PRIMARY KEY,name VARCHAR(255),months INT, salary INT);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (1, 'John Doe', 12, 4500);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (2, 'Jane Smith', 8, 3000);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (3, 'Bob Johnson', 15, 5000);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (4, 'Alice Brown', 5, 2500);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (5, 'Charlie Wilson', 10, 4000);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (6, 'Emily Davis', 3, 2200);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (7, 'David Lee', 14, 4800);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (8, 'Sophia Taylor', 6, 2800);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (9, 'Michael Johnson', 9, 3500);
INSERT INTO Employee (employee_id, name, months, salary) VALUES (10, 'Olivia Miller', 11, 4200);

select name from employee where salary > 2000 and months < 10 order by employee_id asc;