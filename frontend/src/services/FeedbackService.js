const API_URL = "/api/feedback";

// Fetch all feedback from the backend
const getFeedbacks = () => {
  return fetch(API_URL)
    .then((response) => response.json());
};

export default getFeedbacks;