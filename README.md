# React Express User Management System

A full-stack User Management System built with React, Express.js, MongoDB, and JWT Authentication. This project demonstrates complete CRUD (Create, Read, Update, Delete) functionality with a responsive frontend and a secure REST API backend.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected API Routes
- Password Hashing using bcrypt

### User Management

- Create User
- View All Users
- Update User
- Delete User

### Frontend

- React (Vite)
- Axios for API requests
- React Router DOM
- Responsive UI
- Tailwind CSS
- Real-time UI updates after CRUD operations
- Client-side form validation

### Backend

- Express.js
- MongoDB with Mongoose
- RESTful API
- JWT Authentication
- Password Encryption
- Middleware for Authentication
- Global Error Handling
- Input Validation

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors

---

# Project Structure

```
react-express-user-management
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/FurqanAlyy/user-management-crud.git
```

```bash
cd user-management-crud
```

---

# Backend Setup

Move into the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

Server will run on

```
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal.

Move into the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the frontend.

```bash
npm run dev
```

Application will run on

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Users

### Get All Users

```
GET /api/users
```

Requires JWT Token.

---

### Create User

```
POST /api/users
```

Requires JWT Token.

---

### Update User

```
PUT /api/users/:id
```

Requires JWT Token.

---

### Delete User

```
DELETE /api/users/:id
```

Requires JWT Token.

---

# Authentication

JWT Authentication is used to secure protected routes.

After a successful login:

- A JWT token is generated.
- The token is stored in Local Storage.
- Axios automatically sends the token in the Authorization header for protected API requests.

---

# Database

MongoDB Atlas is used as the cloud database.

The application stores user information including:

- Name
- Email
- Password (hashed)
- Date of Birth
- CNIC

CNIC is stored as a unique 13-digit value without dashes.

---

# CRUD Flow

### Create

Create a new user from the dashboard.

### Read

Fetch and display all users.

### Update

Edit user information using the same form.

### Delete

Delete users with confirmation.

All operations update the UI immediately without refreshing the page.

---

# Error Handling

The project includes basic error handling on both frontend and backend.

Examples:

- Invalid login credentials
- Duplicate email
- Duplicate CNIC
- Missing required fields
- Unauthorized requests
- Database errors

---

# Security

- Passwords are hashed using bcryptjs.
- Protected routes use JWT authentication.
- Environment variables are stored in `.env`.
- MongoDB Atlas is used for secure cloud database access.

---

# Future Improvements

- Search Users
- Pagination
- Profile Images
- User Roles
- Dark Mode
- Form Validation with React Hook Form
- Toast Notifications
- Unit Testing

---

# Author

**Furqan Ali**

GitHub: https://github.com/FurqanAlyy
