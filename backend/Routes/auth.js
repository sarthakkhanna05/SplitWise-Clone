import express from "express";
import {
    addUser,
    authUser,
} from "../Services/user.js";

const router = express.Router();

router.post('/createuser', addUser);

router.post('/authuser', authUser);

export default router;