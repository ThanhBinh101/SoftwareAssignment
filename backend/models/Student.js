const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    bkID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    purchase: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true },
            paper: { type: Number, required: true }
        }
    ]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student; // CommonJS export