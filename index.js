// add variables for the npm packages and anything else needed
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to the database (mysql)
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Bashi1996",
    database: "employeeTracker",
  },
  console.log("Connected to the database `Employee Tracker` enjoy!")
);

// If connection is successful run the code below
db.connect((err) => {
  if (err) throw err;

  employeeTrackerApp();
});

// inquirer stuff - Ask the user what they would like to do

// Potentially make into seperate ROUTE files for cleaner code below? Or don't if its too complex.

// View all employees

// View Role

// View Department

// Look up employee

// Look Up role

// Look up Department

// Add employee information

// Add Role information

// Add department information

// Update employee Role information
