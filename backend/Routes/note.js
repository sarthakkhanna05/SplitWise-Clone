import express from "express";

import {
    addNote,
    deleteNote
} from "../Services/note.js";


const router = express.Router();

// router.post('/', getAllTransactions)

router.post('/addnote', addNote);

// router.get('/temp', calculateBalances);

router.post('/deletenote', deleteNote);




export default router;