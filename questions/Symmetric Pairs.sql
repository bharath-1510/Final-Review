CREATE TABLE Functions (
  X INT,
  Y INT
);
show tables;

-- Insert values into Functions
INSERT INTO Functions (X, Y) VALUES (1, 2);
INSERT INTO Functions (X, Y) VALUES (3, 4);
INSERT INTO Functions (X, Y) VALUES (5, 6);
INSERT INTO Functions (X, Y) VALUES (2, 1);
INSERT INTO Functions (X, Y) VALUES (4, 3);
INSERT INTO Functions (X, Y) VALUES (7, 8);
INSERT INTO Functions (X, Y) VALUES (8, 7);

select f1.x,f1.y from functions f1 join functions f2            on f1.x = f2.y and f1.y=f2.x    group by f1.x,f1.y    having count(f1.x)>1 or f1.x<f1.y    order by f1.x;