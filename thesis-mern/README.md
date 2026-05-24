# Thesis Submission System — MERN Stack

A full-stack web application for managing the academic thesis/paper submission and review process. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this system supports three user roles: Author, Reviewer, and Admin, each with a dedicated panel and set of permissions.

✨ Features
👤 Author

Register with academic profile (university, address, blood group)
Submit thesis papers (PDF or DOCX, up to 16MB)
Track submission status in real time (Submitted > Under Review > Accepted / Rejected)
View full paper details

🔍 Reviewer

Register with professional profile (qualification, specialization)
View assigned papers from the Admin
Submit detailed review reports with a decision (Accept / Reject / Accept with Revision)
Automatic workload cap (max 5 active assignments by default)

🛠️ Admin

View and manage all submitted papers
Assign reviewers to papers (with duplicate and workload checks)
Search and browse all registered users
Create the first admin account via a setup script

🔐 Authentication and Security

JWT-based authentication with 7-day token expiry
Passwords hashed using bcryptjs
Role-based route protection on both frontend and backend
Protected API endpoints using custom Express middleware

## Tech Stack
- **M** — MongoDB (database)
- **E** — Express.js (backend framework)
- **R** — React.js (frontend)
- **N** — Node.js (runtime)

## Project Structure
```
thesis-mern/
├── backend/
│   ├── models/          # Mongoose schemas (User, Paper, Assignment, Review)
│   ├── routes/          # Express API routes
│   ├── middleware/       # JWT authentication middleware
│   ├── uploads/         # Uploaded thesis files stored here
│   ├── server.js        # Main server entry point
│   ├── create_admin.js  # Script to create admin account
│   └── .env             # Environment variables
└── frontend/
    └── src/
        ├── pages/       # All React pages
        ├── components/  # Navbar component
        └── context/     # Auth context (global login state)
```

## Setup Instructions

### 1. Install MongoDB
- Download from https://www.mongodb.com/try/download/community
- Start MongoDB service

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/thesis_submission
JWT_SECRET=change_this_to_any_random_long_string
```

Create admin account:
```bash
node create_admin.js
```

Start backend server:
```bash
npm run dev       # development (with auto-restart)
# OR
npm start         # production
```
Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## Login Credentials (after running create_admin.js)
- **Admin:** admin@thesis.com / admin123
- Register as Author or Reviewer through the Register page

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| POST | /api/papers/submit | Submit thesis (Author) |
| GET | /api/papers/my | Get author's papers |
| GET | /api/papers/all | Get all papers (Admin) |
| GET | /api/papers/status | Check paper status (Author) |
| GET | /api/papers/:id | View single paper |
| GET | /api/papers/download/:id | Download paper file |
| GET | /api/admin/reviewers | List all reviewers (Admin) |
| POST | /api/admin/assign | Assign reviewer to paper (Admin) |
| GET | /api/admin/users | List all users with search (Admin) |
| GET | /api/reviews/my-assignments | Reviewer's assigned papers |
| POST | /api/reviews/submit/:id | Submit review (Reviewer) |
| PUT | /api/users/update-info | Update user profile |
