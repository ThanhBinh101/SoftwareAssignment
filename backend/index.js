const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();
const PORT = 8386;


const { deletePrinter, addPrinter } = require('./controllers/printer');
const { addPurchase } = require('./controllers/students');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', }));

app.delete('/Printer/:id', deletePrinter);
app.post('/Printer', addPrinter);

app.post('/Student/', addPurchase)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
