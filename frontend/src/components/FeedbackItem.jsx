function FeedbackItem({ feedback, onDelete }) {
  return (
    <div className="feedback-card">
      <h3>{feedback.name}</h3>

      <p>{feedback.email}</p>

      <p>{feedback.message}</p>

      {/* Display the feedback submission date */}
      <p>
        Date: {new Date(feedback.created_at).toLocaleDateString()}
      </p>

      {/* Ask the parent component to start the delete process */}
      <button onClick={() => onDelete(feedback.id)}>
        Delete
      </button>
    </div>
  );
}

export default FeedbackItem;