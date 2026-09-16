require("dotenv").config();

const mysql = require("mysql2");

// Create a connection with the local MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check whether the database connection is successful
db.connect((error) => {
  if (error) {
    console.log("Database connection failed:", error);
    return;
  }

  console.log("MySQL database connected");
});

module.exports = db;