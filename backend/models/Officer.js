const mongoose = require("mongoose")

const officerSchema = new mongoose.Schema({
    bkID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    printers: [{ type: String }] // Array of strings

})

const Officer = mongoose.model("Officer", officerSchema)

module.exports = Officer