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

const addRole = async () => {
    // same as .then() above, gives us a Tuple
    const [rows] = await db.findAllDepartments();
    console.table(rows);
    const departmentChoices = rows.map(({ name, id }) => ({ name, value: id }));
    // console.log(departmentChoices);
    const answer = await inquirer.prompt([
      {
        type: "input",
      name: "name",
      message: "What is the role title?",
      validate: validateInput,
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
        validate: validateInput,
      },
      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to?",
        choices: departmentChoices,
      },
    ]);
    // console.log("answer", answer);
    // console.log("answer.name", answer.name);

    db.addARole(answer.name, answer.salary, answer.department).then(() => {
        db.findAllRoles().then(([rows]) => {
          console.table(rows);
          return mainMenu();
        });
      });
    };

    function mapEmployeeChoices({ id, name }) {
        return { name, value: id };
      }

      const addEmployee = async () => {
        const [rowsA] = await db.findAllRoles();
        console.table(rowsA);
        const roleChoices = rowsA.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        console.log(roleChoices);

        const [rowsB] = await db.findAllEmployees();
        const employeeChoices = rowsB.map(mapEmployeeChoices);
        console.log(employeeChoices);

        const managerChoices = [...employeeChoices, { name: "Null" }];
        console.log(managerChoices);
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
                validate: validateInput,
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
                validate: validateInput,
              },
              {
                type: "list",
                name: "role_id",
                message: "What is this employee's role?",
                choices: roleChoices,
              },
              {
                type: "confirm",
                name: "managerOrNot",
                message: "Does this employee have a manager?",
                default: true,
              },
              {
                type: "list",
                name: "manager_id",
                when: function (answers) {
                  return answers.managerOrNot === true;
                },
                message: "Who is this employee's manager?",
                choices: managerChoices,
              },
            ]);

  }