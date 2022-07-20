// add variables for the npm packages and anything else needed
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./routes/connection");

// If connection is successful run the code below
db.connect((err) => {
  if (err) throw err;

  employeeTrackerApp();
});

// inquirer stuff - Ask the user what they would like to do
function employeeTrackerApp() {
  inquirer
    .prompt({
      name: "selection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Department",
        "View role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Role",
      ],
    })
    .then(function (answer) {
      console.log(answer);

      if (answer.selection === "View All Employees") {
        viewAllEmployees();
      } else if (answer.selection === "View Department") {
        viewDepartments();
      } else if (answer.selection === "View Role") {
        viewEmployeeRole();
      } else if (answer.selection === "Add Employee") {
        addEmployee();
      } else if (answer.selection === "Add Department") {
        addDepartment();
      } else if (answer.selection === "Add Role") {
        addEmployeeRole();
      } else if (answer.selection === "Update Role") {
        updateEmployeeRole();
      } else {
        db.end();
      }
    });
}
// Potentially make into seperate ROUTE files for cleaner code below? Or don't if its too complex.

// View all employees
function viewAllEmployees() {
  db.query(
    "SELECT employeeTable.id, employeeTable.first_name, employeeTable.last_name, employeeTable.role_id, employeeTable.manager_id, roleTable.title, roleTable.salary, roleTable.id, departmentTable.id FROM employeeTable LEFT JOIN roleTable ON employeeTable.role_id = roleTable.id LEFT JOIN departmentTable ON roleTable.department_id = departmentTable.id",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      // allow the user to go back and select again
      employeeTrackerApp();
    }
  );
}

// View Role
function viewEmployeeRole() {
  db.query(
    "SELECT roleTable.id, roleTable.title, roleTable.salary, roleTable.department_id, departmentTable.id, departmentTable.name FROM roleTable LEFT JOIN departmentTable on roleTable.department_id = departmentTable.id",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      // allow the user to go back and select again
      employeeTrackerApp();
    }
  );
}

// View Department
function viewDepartments() {
  db.query("SELECT * FROM departmentTable", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    // allow the user to go back and select again
    employeeTrackerApp();
  });
}

// Look up employee

// Look Up role

// Look up Department

// Add employee information

// Add Role information

// Add department information

// Update employee Role information

// Export
// module.exports = {employeeTrackerApp};