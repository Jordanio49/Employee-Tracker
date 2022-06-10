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
                // call the soon to be created viewEmployees(); function here
                break;
            case "Add Employee":
                // call the soon to be created addEmployees(); function here
                break;
            case "Update Employee Role":
                // call the soon to be created updateEmployeeRole(); function here
                break;
            case "View All Roles":
                // call the soon to be created viewAllRoles(); function here
                break;
            case "Add Role":
                // call the soon to be created addRole(); function here
                break;
            case "View All Departments":
                // call the soon to be created viewAllDepartments(); function here
                break;
            case "Add Department":
                // call the soon to be created addDepartment(); function here
                break;
            case "Quit":
                // call the soon to be created quitApp(); function here
                break;
            default:
                break;
        }
    })
};