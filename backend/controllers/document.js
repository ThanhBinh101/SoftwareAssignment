const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../frontend/db.json');

const addDocument = async (req, res) => {
    const {name, paper, studentID, location} = req.body;

    if (!name || !paper || !studentID) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newDoc = {
        id: Math.random().toString(36).substring(2, 22),
        name: name,
        status: "",
        printDate: new Date().toISOString().split("T")[0],
        finishDate: "",
        paper: paper,
        studentID: studentID
    }
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const db = JSON.parse(data);
        const matchPrinters = db.Printer.filter((p) => p.location === location);
        if (matchPrinters.length === 0) {
            return res.status(404).json("Invalid Location");
        }
        for (const printer of matchPrinters) {
            if (printer.paper >= paper) {
                if (!printer.history) printer.history = [];
                printer.history.push(newDoc.id);
                printer.paper -= paper;
                newDoc.status = "complete";
                newDoc.finishDate = new Date().toISOString().split("T")[0];
                break;
            }
        }
        if(newDoc.status != "complete") {
            if (!printer.queue) printer.queue = [];
            matchPrinters[0].queue.push(newDoc.id);
            newDoc.status = "pending";
        }

        db.Document.push(newDoc);

        await fs.writeFile(filePath, JSON.stringify(db, null, 2));
        return res.status(201).json({ message: 'Document created successfully', document: newDoc });

      } catch (err) {
        console.error('Error saving document:', err);
        return res.status(500).json({ message: 'Error saving document', error: err.message });
      }
}

module.exports = {addDocument};