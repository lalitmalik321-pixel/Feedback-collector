import { useState } from "react";

function FeedbackForm({feedbacks, setFeedbacks})  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
  event.preventDefault();

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  const newFeedback = {
  id: Date.now(),
  name,
  email,
  message,
  date: new Date().toISOString().split("T")[0],
};

  setFeedbacks([...feedbacks , newFeedback]);

  setName("");
  setEmail("");
  setMessage("");
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