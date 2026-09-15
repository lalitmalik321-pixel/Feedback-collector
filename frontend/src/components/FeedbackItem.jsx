function FeedbackItem({ feedback, onDelete }) {
  return (
    <div className="feedback-card">
      <h3>{feedback.name}</h3>
      <p>{feedback.email}</p>
      <p>{feedback.message}</p>
      <p>Date: {new Date(feedback.created_at).toLocaleDateString()}</p>

      <button onClick={() => onDelete(feedback.id)}>
        Delete
      </button>
    </div>
  );
}

export default FeedbackItem;