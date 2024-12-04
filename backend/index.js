const express = require('express'); // Import Express
const app = express();             // Create an instance of Express
const connectDB = require('./database.js');
const studentModel = require('./models/Student.js')
const cors = require('cors')

app.use(express.json())
app.use(cors )
connectDB();

app.get('/', async  (req, res)=> {
    const students = await studentModel.find()
    res.json(students)
})
// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
