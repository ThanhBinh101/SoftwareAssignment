const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8386;


const { deletePrinter, addPrinter } = require('./controllers/printer');
const { addPurchase } = require('./controllers/students');
const { refillPaper } = require('./controllers/officer');

app.use(express.json());
app.use(cors());

app.post('/Printer', addPrinter);
app.delete('/Printer/:id', deletePrinter);

app.post('/addPurchase', addPurchase);

app.post('/refillPaper/:id', refillPaper);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
