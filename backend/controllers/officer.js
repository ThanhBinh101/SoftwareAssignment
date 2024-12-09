const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../frontend/db.json');

const refillPaper = async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;
  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid refill amount' });
  }
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const db = JSON.parse(data);
    if (!db.Printer || !Array.isArray(db.Printer)) {
      return res.status(400).json({ message: 'Invalid database structure' });
    }
    const printer = db.Printer.find((p) => p.id === id);
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }
    const newRefill = {
      date: new Date().toISOString().split("T")[0],
      amount: amount
    }
    printer.refillPaper.push(newRefill);
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
    return res.status(201).json({ message: 'Refill added successfully', newRefill });
  } catch (err) {
    console.error('Error handling refill:', err);
    return res.status(500).json({ message: 'Error processing refill.', error: err.message });
  }
}

module.exports = { refillPaper };