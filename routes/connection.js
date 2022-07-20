const mysql = require("mysql2");

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

module.exports = db;
