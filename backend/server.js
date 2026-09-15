// Import the Express package
// Express is used to create and manage the backend server
const express = require("express");

// Import CORS
// CORS allows the frontend and backend to communicate from different origins
const cors = require("cors");

// Import the MySQL database connection from db.js
const db = require("./db");

// Create an Express application
const app = express();

// Enable CORS so the React frontend can send requests to this backend
app.use(cors());

// Allow Express to read JSON data sent in requests
app.use(express.json());


// GET request for the home route
// Used to check whether the backend server is running
app.get("/", (req, res) => {
  res.send("Feedback Collector Backend is running");
});


// POST request to add new feedback
// Receives feedback data from the React frontend
app.post("/api/feedback", (req, res) => {

  // Get name, email, and message from the request body
  const { name, email, message } = req.body;

  // SQL query to insert feedback into the database
  // ? placeholders are used to safely pass the values
  const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";

  // Execute the SQL query using the MySQL connection
  db.query(sql, [name, email, message], (error, result) => {

    // Handle database error
    if (error) {
      console.log("Error inserting feedback:", error);

      return res.status(500).json({
        message: "Failed to save feedback",
      });
    }

    // Send a success response with the newly created feedback ID
    res.status(201).json({
      message: "Feedback saved successfully",
      id: result.insertId,
    });
  });
});


// GET request to fetch all feedback
// This can be called when the React page loads or needs to refresh the data
app.get("/api/feedback", (req, res) => {

  // SQL query to get all feedback
  // ORDER BY id DESC shows the newest feedback first
  const sql = "SELECT * FROM feedback ORDER BY id DESC";

  // Execute the SQL query
  db.query(sql, (error, results) => {

    // Handle database error
    if (error) {
      console.log("Error fetching feedback:", error);

      return res.status(500).json({
        message: "Failed to fetch feedback",
      });
    }

    // Send the feedback data back to the React frontend
    res.json(results);
  });
});


// DELETE request to remove feedback using its ID
app.delete("/api/feedback/:id", (req, res) => {

  // Get the ID from the URL parameter
  const { id } = req.params;

  // SQL query to delete the feedback with the given ID
  const sql = "DELETE FROM feedback WHERE id = ?";

  // Execute the DELETE query
  db.query(sql, [id], (error, result) => {

    // Handle database error
    if (error) {
      console.log("Error deleting feedback:", error);

      return res.status(500).json({
        message: "Failed to delete feedback",
      });
    }

    // Send success response
    res.json({
      message: "Feedback deleted successfully",
    });
  });
});


// Start the backend server on port 5001

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});