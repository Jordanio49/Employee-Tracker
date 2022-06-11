// importing mysql, inquirer, console.table, and dotenv
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

require('dotenv').config()

// connecting to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err)
        throw err;

        // creating the intro page for the console
            console.log("***********************************")
            console.log("*                                 *")
            console.log("*        EMPLOYEE MANAGER         *")
            console.log("*                                 *")
            console.log("***********************************")
            promptUser();
})


// prompt for user to select from a list of options for the database
function promptUser() {
    inquirer.prompt({
        name: "action",
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
    })
        .then(function (answer) {
            // switch statement to run functions based on what option the user selected
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
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        console.table(res);
        promptUser();
    })
};

function addEmployee() {
    var query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the new employee's first name?",
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log('Please enter a first name for your employee');
                        return false;
                    }
                }
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the new employee's last name?",
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log('Please enter a last name for your employee');
                        return false;
                    }
                }
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the employee's manager's ID?",
                validate: managerIdInput => {
                    if (managerIdInput) {
                        return true;
                    } else {
                        console.log('Please enter a manager id for your employee');
                        return false;
                    }
                }
            },
            {
                name: "role",
                type: "list",
                choices: function () {
                    var rolesArr = [];
                    for (let i = 0; i < res.length; i++) {
                        rolesArr.push(res[i].job_title);
                    }
                    return rolesArr;
                },
                message: "What is the new employee's role"
            }
        ])
            .then(function (answer) {
                let role_id;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].title == answer.role) {
                        role_id = res[j].id;
                    }
                }
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id
                    },
                    function (err) {
                        if (err)
                            throw err;
                        promptUser();
                    }
                )
            })
    })
};

function updateEmployeeRole() { };

function viewAllRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        console.table("All Roles", res);
        promptUser();
    })
};

function addRole() { };

function viewAllDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        console.table("All Departments", res);
        promptUser();
    })
};

function addDepartment() { };

function quitApp() {
    connection.end();
};