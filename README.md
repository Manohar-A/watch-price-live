# watch-price-live
This repository contains the source code for a real-time price data application. The application consists of a backend built with Express and a frontend built with Next.js. The backend server polls real-time data for 5 cryptocurrencies from the LiveCoinWatch API and stores it in a MongoDB database. The frontend fetches and displays the most recent 20 real-time data entries, updates dynamically, and includes a modal/popup for changing the cryptocurrency.

## Data Polling
The data is fetched from the LiveCoinWatch API. The application currently supports real-time data for 5 cryptocurrencies. Although LiveCoinWatch updates its data every 2 seconds, to reduce the polling overhead on LiveCoinWatch, the application polls the API once every 10 seconds for each of the 5 cryptocurrencies, resulting in 5 requests per 10 seconds.


## Prerequisites

- Node.js installed on your machine
- MongoDB server running locally on `localhost:27017`

## Project Structure

```plaintext
.
├── backend
│   ├── package.json
│   ├── ...
├── frontend
│   ├── package.json
│   ├── ...
├── start.sh
└── README.md
```
## Installation and Running the Application
1. Clone the repository
```bash
git clone https://github.com/Manohar-A/watch-price-live.git
cd watch-price-live
```

2. Ensure MongoDB is running
Make sure your MongoDB server is running locally on `localhost:27017`.

3. Run the setup script
- The provided start.sh script will navigate to the backend and frontend directories, install the necessary dependencies, and start both servers.


```bash
./start.sh
```

The script performs the following steps:
- Navigates to the backend folder
- Installs backend dependencies
- Starts the backend server on port 5001
- Navigates back to the root folder
- Navigates to the frontend folder
- Installs frontend dependencies
- Starts the frontend server on port 3000

Here is the content of the start.sh script:
```bash
#!/bin/bash

# Navigate to the backend folder
cd backend

# Install backend dependencies
npm install

# Start the backend server on port 5001
npm start

# Navigate back to the root folder
cd ..

# Navigate to the frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the frontend server on port 3000
npx next run dev
```

Make sure the script has execute permissions:
```bash
chmod +x start.sh
```


Then, run the script:

```bash
./start.sh
```

## Accessing the Application
The backend server will be running on [http://localhost:5001](http://localhost:5001)
The frontend server will be running on [http://localhost:3000](http://localhost:3000)

## Terminating the Processes
- You can either choose to run the script or execute the commands one by one in terminal. If you use the script to start the server, use the script stop.sh to kill the processes.

Make sure the script has execute permissions:
```bash
chmod +x stop.sh
```

Then, run the script:

```bash
./stop.sh
```

    
## Additional Information

Ensure that your MongoDB server is running before starting the application.
The backend server is set to listen on port 5001, and the frontend server is set to listen on port 3000.
If you encounter any issues, please check that all dependencies are correctly installed and that the MongoDB server is running as expected.

