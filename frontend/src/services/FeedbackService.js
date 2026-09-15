const API_URL = "https://feedback-collector-production-55dd.up.railway.app/api/feedback";

// Fetch all feedback from the backend
const getFeedbacks = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

export default getFeedbacks;