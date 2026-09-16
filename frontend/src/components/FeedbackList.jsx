import { useState } from "react";
import ModalComponent from "./ModalComponent";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({ feedbacks, handleDelete }) {
   // State to track the ID of the feedback to be deleted
const [selectedId, setSelectedId] = useState(null);

  // Set the selectedId to the id of the feedback to be deleted
const handleDeleteClick = (id) => {
  setSelectedId(id);
};

  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>

      {feedbacks.map((feedback) => (                       
      <FeedbackItem key={feedback.id}
                    feedback={feedback}
                    onDelete={handleDeleteClick}
      />
      ))}

      {/* Show the confirmation modal when a feedback is selected */}
    {selectedId !== null && (                        
        <ModalComponent
          onConfirm={() => {
  fetch(`/api/feedback/${selectedId}`, {
       method: "DELETE",
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
       handleDelete(selectedId);
      setSelectedId(null);
      });
}}
          onCancel={() => setSelectedId(null)}
        />
      )}
    </div>
  ); 
}

export default FeedbackList;