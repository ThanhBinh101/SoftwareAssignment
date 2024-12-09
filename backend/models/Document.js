const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    printDate: { type: Date, required: true },
    status: { type: String, required: true },
    paper: { type: Number, required: true },
    printerID: { type: String, required: true },
    studentID: { type: String, required: true }
});

const Document = mongoose.model("Document", documentSchema);

exports.module=Document;