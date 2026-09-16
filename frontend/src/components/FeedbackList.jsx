import { useState } from "react";
import ModalComponent from "./ModalComponent";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({ feedbacks, handleDelete }) {
  // Store the ID of the feedback selected for deletion
  const [selectedId, setSelectedId] = useState(null);

  // Open the confirmation modal
  const handleDeleteClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>

      {/* Display each feedback entry */}
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onDelete={handleDeleteClick}
        />
      ))}

      {/* Show the confirmation modal when a feedback is selected */}
      {selectedId !== null && (
        <ModalComponent
          onConfirm={() => {
            // Delete the selected feedback from the database
            fetch(
              `http://localhost:5001/api/feedback/${selectedId}`,
              {
                method: "DELETE",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);

                // Remove the feedback from the screen
                handleDelete(selectedId);

                // Close the modal
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