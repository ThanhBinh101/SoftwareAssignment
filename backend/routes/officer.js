import express from "express";
import { getOfficerData } from '../controllers/officer.js'; // assuming you have this controller

const router = express.Router();

// Route to fetch officer data by ID
router.get('/officer', getOfficerData);

export default router;