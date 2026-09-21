# Live 🎉
https://codpro-technology.onrender.com

# MERN Authentication & Team Management System

A full-stack MERN application with secure user authentication, email OTP verification, JWT-based authorization, password management, and team-member management.

## Features

- User registration
- Email OTP verification
- Secure login
- JWT authentication
- Protected routes
- Password hashing with bcrypt
- Forgot password / password reset
- OTP-based password verification
- Add team members
- Manage team members
- MongoDB database
- Express.js REST API
- React.js frontend
- Environment variable configuration
- Request validation
- Rate limiting for authentication endpoints
- CORS and security middleware

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt / bcryptjs
- Nodemailer
- Express Validator
- Helmet
- CORS
- Express Rate Limit

### Database

- MongoDB Atlas

---

# Project Structure

```text
project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
