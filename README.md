[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Jest](https://img.shields.io/badge/Jest-29.0.0-brightgreen.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
![Static Badge](https://img.shields.io/badge/Pino-Logging-salmon)
![MongoDB](https://img.shields.io/badge/MongoDB-4.2-green?logo=mongodb&logoColor=white)

## Table of Contents

- [Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Contact](#contact)

## Project Description

**TicketMeister** TicketMeister is a modern event ticketing web application, designed as a streamlined alternative to TicketMaster. Users can browse events, purchase tickets, and interact with other attendees in real time.

---

## Features

- User Accounts: Create and manage user profiles.
- Event Signup: Browse events and sign up or purchase tickets.
- Event Chat: Chat with other participants before and after events.

**Future Features:**

- Password recovery (forgot password functionality).
- Dashboard to view a list of registered events.
- Google authentication as an alternative to password login.

---

## Tech Stack

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Backend  | JavaScript, Node.js (Express) |
| Frontend | React, JavaScript             |
| Database | MongoDB (w/ Mongoose)         |
| Testing  | Jest                          |
| Logging  | Pino                          |

---

## Setup

### Prerequisites

- Node.js 14.x or higher
- npm (comes with Node.js)
- JavaScript (ES6+)
- MongoDB (MongoDB Atlas account)

### Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/lms651/ticketmeister.git
   cd ticketmeister
   ```

2. Set up the backend:

   ```bash
   cd backend
   npm install
   ```

3. Set up the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create environment files:

   ## Backend

   Create a `.env` file in the `backend` directory with the following variables:

   - `MONGO_URI`: The full connection string for your MongoDB Atlas cluster.  
      Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/TicketMeister?retryWrites=true&w=majority`
   - `PORT`: The port your Express server will run on (default `5000`).

   In backend/app.js specify your frontend server.

   ## Testing Environment Setup

   If you want to test **TicketMeister** without affecting your main database, create separate environment files in the `backend` folder.

   ### Example Files

   - `.env.test.users` – For testing user-related functionality
   - `.env.test.signups` – For testing signups / ticket purchases
   - `.env.test.venues` – For testing venue-related functionality

   ## Frontend

   To make your frontend API calls configurable, create a `.env` file in the `frontend` folder with the following variable:

   ```env
   VITE_API_BASE_URL=http://localhost:5000

   ```

5. Start the services:
   - Backend:
     cd backend
     `node src/server.js`
   - Frontend:
     cd ../frontend
     `npm run dev`

## API Endpoints

## Example User Route

### 1. POST /register

**Description:** Registers a new user.

**Request:**

- Method: `POST`
- Produces: `application/json`

**Request Body Parameters:**

| Parameter   | Type   | Description                  |
| ----------- | ------ | ---------------------------- |
| `name`      | string | User's full name             |
| `phone`     | string | User's phone number          |
| `phoneType` | string | Type of phone (mobile, home) |
| `address`   | string | User's address               |
| `password`  | string | User's password              |

**Request Body Example:**

```json
{
  "userName": "Lori",
  "phone": "555-123-4567",
  "phoneType": "mobile",
  "address": "123 Main St, City, State",
  "passwoSrd": "securepassword123"
}
```

**Response:**

- Status Codes:

  - `201 Created`: User successfully created.
  - `500 Internal Server Error`: Registration failed.
  - `400 Bad Request`: User already exists.

**Response Body Example (`201 Created`):**

```json
{
  "_id": "6510a8b1f1c2d30012345678",
  "name": "Lori Schmidt",
  "phone": "555-123-4567",
  "phoneType": "mobile",
  "address": "123 Main St, City, State",
  "password": "$2a$10$hashedpasswordvalue",
  "createdAt": "2025-10-26T23:00:00.000Z",
  "updatedAt": "2025-10-26T23:00:00.000Z",
  "__v": 0
}
```

## Example Venue Route

### 2. GET /venues/:id

**Description:** Retrieves a venue by its ID, including the computed number of attendees.

**Request:**

- Method: `GET`
- Produces: `application/json`
- URL Parameters:

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| `id`      | string | ID of the venue |

**Response:**

- Status Codes:

  - `200 OK`: Venue found and returned.
  - `404 Not Found`: Venue with the given ID does not exist.
  - `500 Internal Server Error`: Query failed.

**Response Body Example (`200 OK`):**

```json
{
  "_id": "6510b9c2f1c2d30098765432",
  "eventName": "Spring Music Festival",
  "venueName": "City Park",
  "eventDate": "2025-11-10T05:00:00.000Z",
  "eventTime": "18:00",
  "ticketPrice": 50,
  "location": "123 Park Ave, City, State",
  "description": "An evening of live music in the park.",
  "numberOfAttendees": 27,
  "createdAt": "2025-10-26T23:15:00.000Z",
  "updatedAt": "2025-10-26T23:15:00.000Z",
  "__v": 0
}
```

## Example Signup Route

### 3. POST /signup

**Description:** Creates a new sign-up (ticket purchase) for a venue.

**Request:**

- Method: `POST`
- Produces: `application/json`

**Request Body Example:**

```json
{
  "userId": "6510a1b2c3d4e56789012345",
  "venueId": "6510b9c2f1c2d30098765432",
  "ticketCount": 3
}
```

**Response:**

- Status Codes:

  - `201 Created`: Signup successfully created.
  - `500 Internal Server Error`: Signup failed.

**Response Body Example (`201 Created`):**

```json
{
  "_id": "6520c4d5e6f7a80012345678",
  "userId": "6510a1b2c3d4e56789012345",
  "venueId": "6510b9c2f1c2d30098765432",
  "ticketCount": 3,
  "createdAt": "2025-10-26T23:45:00.000Z",
  "updatedAt": "2025-10-26T23:45:00.000Z",
  "__v": 0
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact Lori
