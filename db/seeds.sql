-- Add into the created departmentTable from the schema file
INSERT INTO departmentTable (name)
VALUES 
("Management"),
("Accounting"),
("Engineering"),
("Markerting / Design"),
("Human Resources");

-- Add into the created roleTable from the schema file
INSERT INTO roleTable (title, salary, department_id)
VALUES
("Manager", 8765432, 1),
("Accountant", 3352567, 2),
("Engineer", 6542158, 3),
("Designer", 2563145, 4),
("Administration", 1263548, 5);

-- Add into the created employeeTable from the schema file
INSERT INTO employeeTable(first_name, last_name, role_id, manager_id)
VALUES
("Trevor", "Bos", 1, 1 ),
("Jake", "Wright", 2, 2 ),
("Mandy", "Brandt", 5, 3 ),
("Test", "Dummy", 3, 4 ),
("Melissa", "Bee", 4, 5 ),
("Gerry", "Conta", 1, 6 ),
("Harry", "Potter", 2, 7 );


