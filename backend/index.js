const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8386;

const filePath = path.join(__dirname, '../frontend/db.json');

// Middleware to parse JSON
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5174', }));

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

app.post('/Printer', async (req, res) => {
  const { id, location, officerID, status, paper, queue, maintains, refillPaper } = req.body;

  // Ensure required fields are present
  if (!id || !location || !officerID) {
    return res.status(400).json({ message: `Missing required fields: id, location, officerID` });
  }

  // Create a new printer object
  const newPrinter = {
    id: id,
    location: location,
    status: status || 'Off',
    paper: paper || 0,
    queue: queue || null,
    maintains: maintains || null,
    refillPaper: refillPaper || null,
  };

  try {
    // Read the file
    const data = await fs.readFile(filePath, 'utf8');
    const db = JSON.parse(data);

    // Ensure `Printer` key exists in the database
    if (!db.Printer || !Array.isArray(db.Printer)) {
      db.Printer = [];
    }

    // Check for duplicate ID in printers
    if (db.Printer.some((printer) => printer.id === id)) {
      return res.status(409).json({ message: 'Printer ID already exists.' });
    }

    // Find the officer by officerID
    const officer = db.Officer.find((officer) => officer.id === officerID);
    if (officer) {
      // Add the new printer to the Printer array
      db.Printer.push(newPrinter);
      
      // Add the printer ID to the officer's printers array
      officer.printers.push(newPrinter.id);

      // Write updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(db, null, 2));

      return res.status(201).json({ message: 'Printer added successfully', newPrinter });
    } else {
      return res.status(409).json({ message: 'Officer ID does not exist.' });
    }
  } catch (err) {
    console.error('Error handling printer:', err);
    return res.status(500).json({ message: 'Error processing printer.', error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
