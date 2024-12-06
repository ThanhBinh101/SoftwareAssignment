import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS for the frontend
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Define the path to the db.json file
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, '../frontend/db.json');

// Endpoint to update the printer status
app.put('/api/update-printer-status', (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).send('Printer ID and status are required');
  }

  // Read the db.json file to get the printer data
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    let printers = JSON.parse(data);

    const printerIndex = printers.findIndex(printer => printer.id === id);
    if (printerIndex === -1) return res.status(404).send('Printer not found');

    printers[printerIndex].status = status;  // Update the status

    // Save the updated printers data back to db.json
    fs.writeFile(filePath, JSON.stringify(printers, null, 2), 'utf-8', (err) => {
      if (err) return res.status(500).send('Error saving file');
      return res.status(200).json(printers[printerIndex]);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
