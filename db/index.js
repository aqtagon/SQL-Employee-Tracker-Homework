const connection = require("./connection");

class db {
    constructor(connection) {
        this.connection = connection;
      }
      findAllDepartments() {
        return this.connection.promise().query("SELECT * FROM department");
      }
}