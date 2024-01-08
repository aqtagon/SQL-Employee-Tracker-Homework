USE company;

INSERT INTO department(id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "HR");

INSERT INTO roles(id, title, salary, department_id)
VALUES
(1, "Sales Lead", 100000, 1),
(2, "Salesperson", 80000, 1),
(3, "Lead Engineer", 150000, 2),
(4, "Software Engineer", 120000, 2),
(5, "Accountant", 125000, 3),
(6, "HR Manager", 250000, 4),
(7, "HR Representative", 190000, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(1, "John", "Deer", 1, 1),
(2, "Dave", "Jones", 2, 2),
(3, "Alexa", "Rodriguez", 3, 3),
(4, "Ryan", "Gomez", 4, 1),
(5, "Malika", "Brown", 5, 2),
(6, "Tara", "Smith", 6, 3),
(7, "Ricky", "Bobby", 7, 2),
(8, "George", "Little", 3, 3);