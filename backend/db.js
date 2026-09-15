// Load environment variables from the .env file
require("dotenv").config();

// Import MySQL package
const mysql = require("mysql2");

// Create a connection with the MySQL database
const db = mysql.createConnection({
  // MySQL server address
  host: process.env.DB_HOST,

  // MySQL username
  user: process.env.DB_USER,

  // MySQL password
  password: process.env.DB_PASSWORD,

  // Name of the database
  database: process.env.DB_NAME,
});

// Connect to the MySQL database
db.connect((error) => {

  // Check if there was an error while connecting
  if (error) {
    console.log("Database connection failed:", error);
    return;
  }

  // Connection was successful
  console.log("MySQL database connected");
});

// Export the database connection
// so it can be used in other files
module.exports = db;