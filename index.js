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

    answer.menu();

    //   switch (answer.menu) {
    //     case "View all departments":
    //       return viewDepartments();
    //     case "View all roles":
    //       return viewRoles();
    //     case "View all employees":
    //       return viewEmployees();
    //     case "Add a department":
    //       return addDepartment();
    //     case "Add a role":
    //       return addRole();
    //     case "Add an employee":
    //       return addEmployee();
    //     case "Update an employee role":
    //       return updateEmployeeRole();
    //     case "Update employee manager":
    //       return updateEmployeeManager();
    //     case "View employees by manager":
    //       return viewByManager();
    //     case "Exit":
    //       console.log("Bye!");
    //       break;
    //   }    
  };

  function viewDepartments() {
    db.findAllDepartments().then(([rows]) => {
      console.table(rows);
      return mainMenu();
    });
  }

  function viewEmployees() {
    db.findAllEmployees().then(([rows]) => {
      console.table(rows);
      return mainMenu();
    });
  }

  function viewRoles() {
    db.findAllRoles().then(([rows]) => {
      console.table(rows);
      return mainMenu();
    });
  }

  function validateInput(value) {
    if (value) {
      return true;
    } else {
      console.log("\n Please enter a value");
      return false;
    }
  }

  const addDepartment = async () => {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
        validate: validateInput,
      },
    ]);
    // console.log("answer", answer);
    // console.log("answer.name", answer.name);
    const departmentName = answer.name;
  db.addADepartment(departmentName).then(() => {
    db.findAllDepartments().then(([rows]) => {
      console.table(rows);
      return mainMenu();
    });
  });
};

  }