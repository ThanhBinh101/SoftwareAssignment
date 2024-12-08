const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();
const PORT = 8386;


const { deletePrinter, addPrinter } = require('./controllers/printer');

// Middleware to parse JSON
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5174', }));

app.delete('/Printer/:id', deletePrinter);

app.post('/Printer', addPrinter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
