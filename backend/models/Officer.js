const mongoose = require("mongoose")

const officerSchema = new mongoose.Schema({
    bkID:String,
    password:String,
})

const officerModel = mongoose.model("Officer", officerSchema)

module.exports = officerModel