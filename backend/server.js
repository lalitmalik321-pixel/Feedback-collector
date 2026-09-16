const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Allow requests from the React frontend
app.use(cors());

// Read JSON data sent by the frontend
app.use(express.json());

// Check whether the backend server is running
app.get("/", (req, res) => {
  res.send("Feedback Collector Backend is running");
});

// Add new feedback
app.post("/api/feedback", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (error, result) => {
    if (error) {
      console.log("Error inserting feedback:", error);

      return res.status(500).json({
        message: "Failed to save feedback",
      });
    }

    res.status(201).json({
      message: "Feedback saved successfully",
      id: result.insertId,
    });
  });
});

// Get all feedback
app.get("/api/feedback", (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY id DESC";

  db.query(sql, (error, results) => {
    if (error) {
      console.log("Error fetching feedback:", error);

      return res.status(500).json({
        message: "Failed to fetch feedback",
      });
    }

    res.json(results);
  });
});

// Delete feedback by ID
app.delete("/api/feedback/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM feedback WHERE id = ?";

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error deleting feedback:", error);

      return res.status(500).json({
        message: "Failed to delete feedback",
      });
    }

    res.json({
      message: "Feedback deleted successfully",
    });
  });
});

// Start the backend server
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});