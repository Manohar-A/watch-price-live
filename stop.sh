#!/bin/bash

# Read the PIDs from the file
BACKEND_PID=$(cat backend.pid)
FRONTEND_PID=$(cat frontend.pid)

# Terminate the processes
kill $BACKEND_PID
kill $FRONTEND_PID

# Remove the PID files
rm backend.pid frontend.pid
