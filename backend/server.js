const express = require("express"); // express package already installed here it is stored in variable ,it is used for making a backend server

const cors = require("cors");//CORS helps our frontend and backend communicate when they are running on different origins/ports.

const db = require("./db"); //"Import the MySQL connection that we created in db.js."

const app = express(); //we create an Express application.,From now on, we'll use:app,to configure our server.

app.use(cors());  //This allows our React frontend to communicate with our backend.
app.use(express.json());  //"When the frontend sends JSON data, understand/read it."

app.get("/", (req, res) => { //get is for read something 
  res.send("Feedback Collector Backend is running"); //it is respond send to browser
});

app.post("/api/feedback", (req, res) => { // it receives the new data come from react
  const { name, email, message } = req.body; // it takes those three values out of it.

  const sql =
    "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)"; // Insert a new row into the feedback table.

  db.query(sql, [name, email, message], (error, result) => { // So we're saying:Use our MySQL connection to execute this SQL.
    if (error) {
      console.log("Error inserting feedback:", error);  // for error
      return res.status(500).json({ message: "Failed to save feedback" });
    }

    res.status(201).json({
      message: "Feedback saved successfully", //if no error while executing the quering
      id: result.insertId,
    });
  });
});

app.listen(5001, () => {
  console.log("Server running on port 5001"); //Start the server on port 5001
});