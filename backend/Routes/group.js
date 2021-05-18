import express from "express";
import {
    addGroup,
    getGroup,
    getAllGroups
} from "../Services/group.js";

const router = express.Router();

router.get('/', getAllGroups)
router.post('/group', getGroup)
router.post('/creategroup', addGroup);


export default router;