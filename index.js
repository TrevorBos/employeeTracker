// add variables for the npm packages and anything else needed
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./routes/connection");

// If connection is successful run the code below
db.connect((err) => {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker!");

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
        "View Role",
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

// Necessary arrays
var userRoles = [];
var userEmployees = [];
var userDepartments = [];

// Look up employee
function lookupEmployee() {
  db.query("SELECT * FROM employeeTable", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      userEmployees.push(
        data[i].id + "-" + data[i].first_name + " " + data[i].last_name
      );
    }
  });
}

// Look Up role
function lookuprole() {
  db.query("SELECT * FROM roleTable", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      userRoles.push(data[i].id + "-" + data[i].title);
    }
  });
}

// Look up Department
function lookupDepts() {
  db.query("SELECT * FROM departmentTable", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      userDepartments.push(data[i].id + "-" + data[i].name);
    }
  });
}

// Add employee information
function addEmployee() {
  lookuprole();
  lookupEmployee();

  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },

      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },

      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: userRoles,
      },

      {
        name: "reportingTo",
        type: "list",
        message: "Who is the employee's manager?",
        choices: userEmployees,
      },
    ])
    .then(function (answer) {
      var getRoleId = answer.role.split("-");
      var getReportingToId = answer.reportingTo.split("-");
      var query = `INSERT INTO employeeTable (first_name, last_name, role_id, manager_id)
     VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
      db.query(query, function (err, res) {
        console.log(
          `New employee ${answer.firstname} ${answer.lastname} has been added!`
        );
      });
      employeeTrackerApp();
    });
}

// Add Role information
function addEmployeeRole() {
  lookuprole();
  lookupEmployee();
  lookupDepts();

  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "Enter the role you would like to add:",
      },

      {
        name: "dept",
        type: "list",
        message: "In what department would you like to add this role?",
        choices: userDepartments,
      },

      {
        name: "salary",
        type: "number",
        message: "Enter the role's salary:",
      },
    ])
    .then(function (answer) {
      console.log(`${answer.role}`);
      var getDeptId = answer.dept.split("-");
      var query = `INSERT INTO roleTable (title, salary, department_id)
     VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
      db.query(query, function (err, res) {
        console.log(`A new role ${answer.role} has been added!`);
      });
      employeeTrackerApp();
    });
}

// Add department information
function addDepartment() {
  lookuprole();
  lookupEmployee();
  lookupDepts();

  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "Enter the department you would like to add:",
      },
    ])
    .then(function (answer) {
      var query = `INSERT INTO departmentTable (name)
     VALUES ('${answer.dept}')`;
      db.query(query, function (err, res) {
        console.log(`A new department ahs been added: ${answer.dept}-------`);
      });
      employeeTrackerApp();
    });
}

// Update employee Role information
function updateEmployeeRole() {
  db.query("SELECT * FROM employeeTable", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",

          message: "Which employee's role is changing?",
          choices: function () {
            var employeeArray = [];
            result.forEach((result) => {
              employeeArray.push(result.last_name);
            });
            return employeeArray;
          },
        },
      ])

      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;

        db.query("SELECT * FROM roleTable", function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  var roleArray = [];
                  res.forEach((res) => {
                    roleArray.push(res.title);
                  });
                  return roleArray;
                },
              },
            ])
            .then(function (roleAnswer) {
              const role = roleAnswer.role;
              console.log(role);
              db.query(
                "SELECT * FROM roleTable WHERE title = ?",
                [role],
                function (err, res) {
                  if (err) throw err;
                  let roleId = res[0].id;

                  let query =
                    "UPDATE employeeTable SET role_id = ? WHERE last_name =  ?";
                  let values = [parseInt(roleId), name];

                  db.query(query, values, function (err, res, fields) {
                    console.log(`You have updated ${name}'s role to ${role}.`);
                  });
                  viewAllEmployees();
                }
              );
            });
        });
      });
  });
}

// Export
// module.exports = {employeeTrackerApp};
