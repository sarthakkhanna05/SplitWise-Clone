import express from "express";
import {
    getUser,
    getInvitations,
    acceptInvitation,
    updateUser,
    getAllUsers
} from "../Services/user.js";

const router = express.Router();

router.post('/getuser', getUser);

router.get('/', getAllUsers);

router.patch('/updateuser', updateUser)

router.patch('/acceptinvitation', acceptInvitation)

router.post('/invitation', getInvitations)

export default router;