import { useState, useEffect } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import getFeedbacks from "../services/FeedbackService";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Track the feedback selected for deletion
  const handleDelete = (id) => {
    setFeedbacks((currentFeedbacks) =>
      currentFeedbacks.filter((feedback) => feedback.id !== id)
    );
  };

  // Load saved feedback when the page is first rendered
  useEffect(() => {
    getFeedbacks()
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((error) => {
        console.log("Error fetching feedback:", error);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Apply keyword and date filters before displaying the feedback
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      (feedback.name.toLowerCase().includes(search.toLowerCase()) ||
        feedback.email.toLowerCase().includes(search.toLowerCase()) ||
        feedback.message.toLowerCase().includes(search.toLowerCase())) &&
      (selectedDate === "" ||
        new Date(feedback.created_at).toLocaleDateString("en-CA") ===
          selectedDate)
  );

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Feedback Collector</h1>

        <FeedbackForm
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}
        />

        <div className="search-box">
          <input
            type="text"
            placeholder="🔎  Search feedback ..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="search-box">
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>

        <FeedbackList
          feedbacks={filteredFeedbacks}
          setFeedbacks={setFeedbacks}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default FeedbackPage;