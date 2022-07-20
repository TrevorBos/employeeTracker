-- DROP THE DATABASE IF EXISTS
DROP DATABASE IF EXISTS employeeTracker;
-- CREATE DATABASE
CREATE DATABASE employeeTracker;

USE employeeTracker;

-- CREATE EMPLOYEE TABLE
CREATE TABLE employeeTable (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, 
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roleTable(id) ON DELETE SET NULL,
    manager_id INTEGER,
    INDEX manager_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employeeTable(id) ON DELETE SET NULL
);

CREATE TABLE roleTable (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- CREATE DEPARTMENT TABLE
CREATE TABLE departmentTable (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

