# Workcity Assessment Backend

This is the backend API for the Workcity Full-Stack & WordPress Developer Assessment.

## Features

- JWT-based authentication (signup/login)
- User roles: admin, user
- CRUD for clients and projects
- Fetch projects by client
- Input validation and error handling
- Unit tests for key endpoints

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- Jest (for testing)

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/isaacudofia/workcity-assessment-backend.git
   cd workcity-assessment-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory with the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/workcity
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm run dev
   ```
5. Run tests:
   ```sh
   npm test
   ```

## Achieved Goal from the API

- Only admins can create/update/delete users and projects.
- Users can view their own clients/projects.
- MongoDB must be running locally or provide a remote URI.
