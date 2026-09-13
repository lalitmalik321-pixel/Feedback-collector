import { useState } from "react";
import ModalComponent from "./ModalComponent";


function FeedbackList({ feedbacks, setFeedbacks }) {
const [selectedId, setSelectedId] = useState(null); // State to track the ID of the feedback to be deleted

const handleDelete = (id) => {          // Set the selectedId to the id of the feedback to be deleted
  setSelectedId(id);
};

  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>

      {feedbacks.map((feedback) => (                        // Render each feedback item in the list
        <div className="feedback-card" key={feedback.id}>
          <h3>{feedback.name}</h3>
          <p>{feedback.email}</p>
          <p>{feedback.message}</p>
          <p>Date: {feedback.date}</p>

           <button onClick={() => handleDelete(feedback.id)}>
                 Delete
            </button>
        </div>
      ))}

          {selectedId !== null && (                        // Show the modal only when selectedId is not null
        <ModalComponent
          onConfirm={() => {                                    // Handle the confirmation of deletion
            const updatedFeedbacks = feedbacks.filter(  //filter used for go through the feedbacks and remove the one with we want to delete
              (feedback) => feedback.id !== selectedId  //coniton to remove the feedback 
            );

            setFeedbacks(updatedFeedbacks);
            setSelectedId(null);
          }}
          onCancel={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default FeedbackList;