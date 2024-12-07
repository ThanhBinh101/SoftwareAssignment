const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8386;

const filePath = path.join(__dirname, '../frontend/db.json');

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Update to your frontend's URL
}));

app.delete('/Printer/:id', (req, res) => {
  const printerId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    try {
      // Parse the JSON data
      const db = JSON.parse(data);

      // Ensure `Printer` key exists
      if (!db.Printer || !Array.isArray(db.Printer)) {
        return res.status(400).json({ message: 'Invalid database structure' });
      }

      // Find the printer by ID
      const printerIndex = db.Printer.findIndex((printer) => printer.id === printerId);

      if (printerIndex === -1) {
        return res.status(404).json({ message: 'Printer not found' });
      }

      // Remove the printer
      db.Printer.splice(printerIndex, 1);

      // Write updated data back to the file
      fs.writeFile(filePath, JSON.stringify(db, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing to db.json:', writeErr);
          return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json({ message: `Printer ${printerId} deleted successfully` });
      });
    } catch (parseError) {
      console.error('Error parsing db.json:', parseError);
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
