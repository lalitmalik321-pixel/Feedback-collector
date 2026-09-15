// Reusable confirmation modal for delete actions
function ModalComponent({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Delete Feedback</h2>

        <p>Are you sure you want to delete this feedback?</p>

        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;