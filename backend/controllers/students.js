const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../frontend/db.json');

const addPurchase = async (req, res) => {
    const { date, paper, amount , id} = req.body;

    if (!date || !amount || !paper) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPurchase = {
        date: date,
        paper: paper,
        amount: amount
    };

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const db = JSON.parse(data);
        console.log(db.Student);
        if (!db.Student || !Array.isArray(db.Student)) {
            db.Student = [];
        }
        console.log(db.Student);
        const student = db.Student.find((s) => s.id === id);

        if (!student) {
            return res.status(404).json({ message: `Student not found ${id} ${db.Student}` });
        }

        student.purchases.push(newPurchase);
        await fs.writeFile(filePath, JSON.stringify(db, null, 2));

        res.status(200).json({ message: 'Purchase added successfully', student });
    } catch (error) {
        console.error('Error adding purchase:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addPurchase };
