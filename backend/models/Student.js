const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    bkID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const studentModel = mongoose.model("Student", studentSchema)

module.exports = studentModel