// importing mysql, inquirer, console.table, and dotenv
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

require('dotenv').config()

// connecting to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// creating the intro page for the console
afterConnection = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
    promptUser();
}
function promptUser() {
    inquirer.prompt({
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Quit":
                quitApp();
                break;
            default:
                break;
        }
    })
};

function viewAllEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, (err, res) => {
        if(err)
        throw err;
        console.table("All Employees", res);
        promptUser();
    })
};

function addEmployee() {};

function updateEmployeeRole() {};

function viewAllRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if(err)
        throw err;
        console.table("All Roles", res);
        promptUser();
    })
};

function addRole() {};

function viewAllDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if(err)
        throw err;
        console.table("All Departments", res);
        promptUser();
    })
};

function addDepartment() {};

function quitApp() {};