import express from "express";
import {
    calculateBalances
} from "../Services/balance.js";
import {
    addTransaction,
    getAllTransactions,
    getTransaction,
    getAllTransactionsforUser
} from "../Services/transaction.js";


const router = express.Router();

router.post('/', getAllTransactions)

router.post('/transaction', getTransaction);

router.post('/usertransaction', getAllTransactionsforUser);

router.get('/temp', calculateBalances);

router.post('/createtransaction', addTransaction);




export default router;