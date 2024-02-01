CREATE TABLE BST (  N INT,  P INT);
INSERT INTO BST (N, P) VALUES (5, NULL);
INSERT INTO BST (N, P) VALUES (3, 5);
INSERT INTO BST (N, P) VALUES (8, 5);
INSERT INTO BST (N, P) VALUES (2, 3);
INSERT INTO BST (N, P) VALUES (4, 3);
INSERT INTO BST (N, P) VALUES (6, 8);
INSERT INTO BST (N, P) VALUES (9, 8);

select N, case when p is NULL then 'Root'  when (select count(*) from bst where p = a.n) >0 then 'Inner'    else 'Leaf'    end    from BST a    order by n;