const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

async function mainMenu() {
    const { menu } = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "Exit"
            ],
        },
    ]);

    switch (menu) {
        case "View all departments":
            return viewDepartments();
        case "View all roles":
            return viewRoles();
        case "View all employees":
            return viewEmployees();
        case "Add a department":
            return addDepartment();
        case "Add a role":
            return addRole();
        case "Add an employee":
            return addEmployee();
        case "Update an employee role":
            return updateEmployeeRole();
        case "Delete a department":
            return deleteDepartment();
        case "Delete a role":
            return deleteRole();
        case "Delete an employee":
            return deleteEmployee();
        case "Exit":
            console.log("Bye!");
            process.exit();
    }
}


async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.table(departments);
    mainMenu();
}

async function viewRoles() {
    const roles = await db.findAllRoles();
    console.table(roles);
    mainMenu();
}

async function viewEmployees() {
    const employees = await db.findAllEmployees();
    console.table(employees);
    mainMenu();
}


async function addDepartment() {
    
}

async function addRole() {
    
}

async function addEmployee() {
    
}


async function updateEmployeeRole() {
    
}


async function deleteDepartment() {
    
}

async function deleteRole() {
    
}

async function deleteEmployee() {
    
}

mainMenu();