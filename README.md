# Feedback Collector

This is a full-stack feedback collection app that I built using React, Node.js, Express.js and MySQL.

The app allows users to submit feedback and also view, search, filter and delete submitted feedback.

## Features

- Add feedback with name, email and message
- View all submitted feedback
- Search feedback by name, email or message
- Filter feedback by date
- Delete feedback with a confirmation popup
- Feedback is stored in MySQL
- Responsive design

## Technologies Used

- React.js
- CSS
- Node.js
- Express.js
- MySQL
- REST API
- Git and GitHub

## Project Structure

```text
feedback-collector/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── FeedbackItem.jsx
│   │   │   └── ModalComponent.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── FeedbackPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── FeedbackService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/feedback` | Gets all feedback |
| POST | `/api/feedback` | Adds new feedback |
| DELETE | `/api/feedback/:id` | Deletes feedback |

## How to Run

### Backend

Go to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=feedback_db
```

Start the backend:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5001
```

### Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Database Setup

First create the database:

```sql
CREATE DATABASE feedback_db;
```

Then create the feedback table:

```sql
CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How It Works

The React frontend sends requests to the Express backend through the API.

The backend handles these requests and stores or retrieves the feedback from MySQL.

```text
React
  ↓
Express API
  ↓
MySQL
```

For example, when a user submits feedback, React sends a POST request to the backend. The Express server receives the data and saves it in the MySQL database.

When the page loads, React sends a GET request to get the saved feedback and display it.

When a user deletes feedback, React sends a DELETE request with the feedback ID and the backend removes it from MySQL.

## Note

The `.env` file contains database credentials, so it is not included in the GitHub repository.

MySQL should be running before starting the backend.