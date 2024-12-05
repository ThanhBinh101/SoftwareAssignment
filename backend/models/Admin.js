import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    accounts:[{
        bkID: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true }
    }],
    purchases: [{ type: Number }], // Array of numbers representing purchases
    format: [{
        name: { type: String, required: true },
        allow: { type: Boolean, required: true }
    }], 
    nextRefill: { type: Date, required: true },
    refillAmount:{ type: Number, required: true },
    paper: { type: Number, required: true },
    price: { type: Number, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;