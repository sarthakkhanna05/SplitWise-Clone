import express from "express";
import {
    verifyToken
} from "../Utilities/verifyToken.js";
import {
    lala
} from "../Services/dashboard.js";
import {
    auth
} from "../Passport/config.js";



const router = express.Router();

router.get('/', auth, lala);

export default router;