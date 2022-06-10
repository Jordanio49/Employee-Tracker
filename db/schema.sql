-- drop and recreate the employee_db database
DROP DATABASE IF EXISTS employee_db

CREATE DATABASE employee_db

-- tell sql to use employee_db database
USE employee_db

-- creating the departments table
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

-- creating the roles table
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    salary DECIMAL NOT NULL
);

-- creating the employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER
)