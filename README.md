# CRUD Node.js React Web Application

This is a full-stack CRUD (Create, Read, Update, Delete) web application built with Node.js backend and React frontend.

## Features

- Create new items
- Read/list all items
- Update existing items
- Delete items

## Project Structure

```
curd-practice/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── routes/
│       └── items.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── index.css
│       └── components/
│           ├── ItemForm.js
│           └── ItemList.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone or download the project to your local machine.

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The backend will run on http://localhost:5000

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

3. Open your browser and navigate to http://localhost:3000 to use the application.

## API Endpoints

- GET /api/items - Get all items
- GET /api/items/:id - Get item by ID
- POST /api/items - Create new item
- PUT /api/items/:id - Update item by ID
- DELETE /api/items/:id - Delete item by ID

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React.js
- HTTP Client: Axios
- Styling: CSS
