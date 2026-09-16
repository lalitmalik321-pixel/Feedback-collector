import { useState } from "react";

function FeedbackForm({ feedbacks, setFeedbacks }) {
  // Store the values entered in the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    // Prevent the page from refreshing when the form is submitted
    event.preventDefault();

    // Check that all fields have been filled
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Send the feedback to the backend API
      const response = await fetch(
        "http://localhost:5001/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();

      // Show an error if the backend request failed
      if (!response.ok) {
        alert("Failed to save feedback");
        return;
      }

      // Add the newly submitted feedback to the displayed list
      const newFeedback = {
        id: data.id,
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      };

      setFeedbacks([...feedbacks, newFeedback]);

      // Clear the form after successful submission
      setName("");
      setEmail("");
      setMessage("");

      alert("Feedback submitted successfully");
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Submit Your Feedback</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Message</label>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Enter your feedback"
          />
        </div>

        <button className="submit-button" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;