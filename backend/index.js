const express = require('express'); // Import Express
const app = express(); // Create an instance of Express

const cors = require('cors'); // Import CORS middleware
const studentModel = require('./models/Student.js'); // Import Student model
const connectDB = require('./database.js');

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

connectDB()

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Printing API!');
});

app.post('/', async (req, res) => {
    const { bkID, password } = req.body; // Destructure request body
    try {
        console.log(studentModel.json)
        const check = await studentModel.find(); // Find user by bkID
        console.log(check)
        if (check) {
            res.json("student");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        console.error(error); // Log the error for debugging
        res.status(500).json("An error occurred"); // Send a server error response
    }
});

// Start Server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
