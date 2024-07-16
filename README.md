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
# Clone the repository
git clone https://github.com/your-repo/real-time-price-data-app.git

# Navigate to the cloned repository
cd real-time-price-data-app
```

2. Ensure MongoDB is running
Make sure your MongoDB server is running locally on `localhost:27017`.


3. Run API Server
- Navigate to the backend folder
```
cd backend
```
- Install backend dependencies
```
npm install
```
- Start the backend server on port 5001
```
npm start
```

4. Run web frontend
- Navigate back to the root folder
```
cd ..
```
- Navigate to the frontend folder
```
cd frontend

```
- Install frontend dependencies
```
npm install
```
- Start the frontend server on port 3000
```
npm run dev
```


## Accessing the Application
The backend server will be running on [http://localhost:5001](http://localhost:5001)
The frontend server will be running on [http://localhost:3000](http://localhost:3000)
    
## Additional Information

Ensure that your MongoDB server is running before starting the application.
The backend server is set to listen on port 5001, and the frontend server is set to listen on port 3000.
If you encounter any issues, please check that all dependencies are correctly installed and that the MongoDB server is running as expected.

