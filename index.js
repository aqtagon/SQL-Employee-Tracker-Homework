const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

const exit = () => {
    console.log("Bye!");
    process.exit(0);
  };

  const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                { name: "View all departments", value: viewDepartments },
                { name: "View all roles", value: viewRoles },
                { name: "View all employees", value: viewEmployees },
                { name: "Add a department", value: addDepartment },
                { name: "Add a role", value: addRole },
                { name: "Add an employee", value: addEmployee },
                { name: "Update an employee role", value: updateEmployeeRole },
                { name: "Update employee manager", value: updateEmployeeManager },
                { name: "View employees by manager", value: viewByManager },
                { name: "View employees by department", value: viewByDepartment },
                { name: "Delete a department", value: deleteDepartment },
                { name: "Delete a role", value: deleteRole },
                { name: "Delete an employee", value: deleteEmployee },
                { name: "View total utilized budget by department", value: budgetByDepartment},
                { name: "Exit", value: exit },
            ],
        },
    ]);

    
  }