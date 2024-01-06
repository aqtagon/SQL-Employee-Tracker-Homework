const connection = require("./connection");

class db {
    constructor(connection) {
        this.connection = connection;
      }
      findAllDepartments() {
        return this.connection.promise().query("SELECT * FROM department");
      }
      findAllRoles() {
        return this.connection
          .promise()
          .query(
            "SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id"
          );
      }
      findAllEmployees() {
        return this.connection.promise()
        .query(`SELECT
        employee.id, CONCAT(employee.first_name, ' ' , employee.last_name) AS name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager
        FROM
        employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`);
    }
    addADepartment(departmentName) {
      return this.connection
        .promise()
        .query("INSERT INTO department (name) VALUES (?)", [departmentName]);
    }
    addARole(roleTitle, roleSalary, roleDepartmentId) {
      return this.connection
        .promise()
        .query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [roleTitle, roleSalary, roleDepartmentId]
        );
    }
    addAnEmployee(answer) {
      return this.connection
        .promise()
        .query("INSERT INTO employee SET ?", answer);
    }
    updateAnEmployeeRole(roleId, employeeId) {
      return this.connection
        .promise()
        .query("UPDATE employee SET role_id = ? WHERE id = ?", [
          roleId,
          employeeId,
        ]);
    }
    

}