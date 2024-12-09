const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../frontend/db.json');

const deletePrinter = async (req, res) => {
  const printerId = req.params.id;
  const data = await fs.readFile(filePath, 'utf8');
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
    
    const officerPrinterOwner = db.Officer.find((officer) => officer.printers.includes(printerId));

    officerPrinterOwner.printers = officerPrinterOwner.printers.filter((printer) => printer !== printerId);
    db.Printer.splice(printerIndex, 1);
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
    res.status(200).json({ message: `Printer ${printerId} deleted successfully` });
    return;
  } catch (parseError) {
    console.error('Error parsing db.json:', parseError);
    return res.status(500).json({ message: 'Server error' });
  }
 }

const addPrinter = async (req, res) => {

  const { id, location, officerID, status, paper, queue, nextMaintain, maintains, refillPaper } = req.body;
  
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
      queue: [],
      nextMaintain: nextMaintain,
      maintains: [],
      paper: 0,
      refillPaper: [],
    };
  
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const db = JSON.parse(data);
      if (!db.Printer || !Array.isArray(db.Printer)) {
        db.Printer = [];
      }
      if (db.Printer.some((printer) => printer.id === id)) {
        return res.status(409).json({ message: 'Printer ID already exists.' });
      }
      const officer = db.Officer.find((officer) => officer.id === officerID);
      if (officer) {
        db.Printer.push(newPrinter);
        officer.printers.push(newPrinter.id);
        await fs.writeFile(filePath, JSON.stringify(db, null, 2));
        return res.status(201).json({ message: 'Printer added successfully', newPrinter });
      } else {
        return res.status(409).json({ message: 'Officer ID does not exist.' });
      }
    } catch (err) {
      console.error('Error handling printer:', err);
      return res.status(500).json({ message: 'Error processing printer.', error: err.message });
    }
}

const addQueue = async (req, res) => {
  const docID = req.params.id;
  const {location} = req.body;

  const data = await fs.readFile(filePath, 'utf8');
  try {
    const db = JSON.parse(data);
    const matchPrinters = db.Printer.some((p)=>p.location === location);
    if(!matchPrinters) {
      return res.status(404).json("Invalid Location");
    }
    const optimizePrinter = matchPrinters.increase((maxPrinter, currentPrinter) => {
      return currentPrinter.queue.length < maxPrinter.queue.length ? currentPrinter : maxPrinter;
    });

    optimizePrinter.queue.push(docID);
    const doc = db.Document.find((doc)=> doc.id === docID);
    doc.status = "Printing";

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
    return res.status(201).json({ message: 'Printer added successfully', newPrinter });
  } catch(err) {
    console.error('Error handling printer:', err);
      return res.status(500).json({ message: 'Error processing printer.', error: err.message });
  }
}


module.exports = { deletePrinter , addPrinter};
  