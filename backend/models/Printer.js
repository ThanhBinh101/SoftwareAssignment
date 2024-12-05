import mongoose from "mongoose";

const printerSchema = new mongoose.Schema({
    bkID: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
    queue: [{ type: String }],  // Array of document IDs
    maintains: [{
        date: { type: Date, required: true },
        status: { type: String, required: true }
    }]  // Array of maintain status objects
});

const Printer = mongoose.model("Printer", printerSchema);

export default Printer;
