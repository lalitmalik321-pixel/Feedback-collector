import { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  const [search, setSearch] = useState("");     //for search filtering

  const [selectedDate, setSelectedDate] = useState(""); // for date filter

 const filteredFeedbacks = feedbacks.filter(
  (feedback) =>
    (feedback.name.toLowerCase().includes(search.toLowerCase()) ||
      feedback.email.toLowerCase().includes(search.toLowerCase()) ||
      feedback.message.toLowerCase().includes(search.toLowerCase())) &&
    (selectedDate === "" || feedback.date === selectedDate)
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
    placeholder="Search feedback..."
    value={search}
    onChange={(event) => setSearch(event.target.value)}
  />

  <div className="search-box">
  <input
    type="date"
    value={selectedDate}
    onChange={(event) => setSelectedDate(event.target.value)}
  />
</div>

</div>

     <FeedbackList
  feedbacks={filteredFeedbacks}
  setFeedbacks={setFeedbacks}
/>

      </div>
    </div>
  );
}

export default FeedbackPage;