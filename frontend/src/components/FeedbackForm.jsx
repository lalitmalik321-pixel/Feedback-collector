import { useState } from "react";

function FeedbackForm({ feedbacks, setFeedbacks })  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //After submit button
 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  try {
    // Send the feedback to the backend API
    const response = await fetch("https://feedback-collector-production-55dd.up.railway.app/api/feedback", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert("Failed to save feedback");
      return;
    }

    const newFeedback = {
      id: data.id,
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    };

    // Add the newly submitted feedback to the current list
    setFeedbacks([...feedbacks, newFeedback]);

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