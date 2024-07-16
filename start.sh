#!/bin/bash

# Navigate to the backend folder
cd backend

# Install backend dependencies
npm install

# Start the backend server on port 5001
npm start &
BACKEND_PID=$!

# Navigate back to the root folder
cd ..

# Navigate to the frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the frontend server on port 3000
npx npm run dev &
FRONTEND_PID=$!

# Save the PIDs to a file
echo $BACKEND_PID > ../backend.pid
echo $FRONTEND_PID > ../frontend.pid