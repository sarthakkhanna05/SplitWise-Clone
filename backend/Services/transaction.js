import User from "../Models/user.js";
import Group from "../Models/group.js";
import Balance from "../Models/balance.js";
import Transaction from "../Models/transaction.js";
import {
    callAndWait
} from "../index.js";
import {
    UpdateBalancesForTransaction
} from "./balance.js";

export const addTransaction = async (req, res) => {
    //const user = createEmptyUSer();
    let data = null;
    let error = null;
    try {
        const groupId = req.body.groupId;
        const userId = req.body.userId
        const group = await Group.findById(groupId).populate("balances");
        const transaction = createEmptyTransaction(groupId)
        transaction.members_involved = group.members;
        transaction.payer = userId;
        transaction.description = req.body.description;
        transaction.amount = req.body.amount;
        transaction.timestamp = Date.now();
        const balances = group.balances;
        const savedTransaction = await transaction.save();
        const updatedGroup = await addTransactionToGroup(groupId, savedTransaction._id)
        const updatedBalances = await UpdateBalancesForTransaction(balances, group.members, userId, transaction.amount)
        data = {
            savedTransaction,
            updatedGroup,
            updatedBalances
        }
    } catch (err) {
        error = err;
    }
    res.json({
        data,
        error
    });
};


export const addSettleTransaction = async (req, res) => {
    //const user = createEmptyUSer();
    let data = null;
    let error = null;
    try {
        const groupId = req.body.groupId;
        const userId = req.body.userId
        const group = await Group.findById(groupId).populate("balances");
        const transaction = createEmptyTransaction(groupId)
        transaction.members_involved = group.members;
        transaction.payer = userId;
        transaction.description = req.body.description;
        transaction.amount = req.body.amount;
        transaction.timestamp = Date.now();
        const balances = group.balances;
        const savedTransaction = await transaction.save();
        // const updatedGroup = await addTransactionToGroup(groupId, savedTransaction._id)
        // const updatedBalances = await UpdateBalancesForTransaction(balances, group.members, userId, transaction.amount)
        data = {
            savedTransaction,
            // updatedGroup,
            // updatedBalances
        }
    } catch (err) {
        error = err;
    }
    res.json({
        data,
        error
    });
};

export const getAllTransactions = async (req, res) => {
    let data = null;
    let error = null;
    try {
        const groupId = req.body.groupId;
        // console.log(req.body);
        const transactions = await Transaction.find({
            group_id: groupId,
            settle_up: false
        })
        // await transactions[0].populate("payer").populate("members_involved").execPopulate();
        for (let i = 0; i < transactions.length; i++) {
            await transactions[i].populate("payer").populate("members_involved").populate("notes").execPopulate();
        }
        // console.log(transactions)

        // await transactions.populate("payer").populate("members_involved").execPopulate();
        // transactions.map(async (transaction) => await transaction.populate("payer").execPopulate());
        // console.log(transactions)
        // console.log(temp)
        data = transactions
    } catch (err) {
        error = err
    }
    res.json({
        data,
        error
    });
}

export const getAllTransactionsforUser = async (req, res) => {
    let data = null;
    let error = null;
    try {
        const userId = req.body.userId;

        // console.log(req.body);
        const transactions = await Transaction.find({
            members_involved: userId
        })
        // await transactions[0].populate("payer").populate("members_involved").execPopulate();
        for (let i = 0; i < transactions.length; i++) {
            await transactions[i].populate("payer").populate("members_involved").populate("notes").execPopulate();
        }
        console.log(transactions);

        // await transactions.populate("payer").populate("members_involved").execPopulate();
        // transactions.map(async (transaction) => await transaction.populate("payer").execPopulate());
        // console.log(transactions)
        // console.log(temp)
        res.json(transactions)
    } catch (err) {
        res.json(err)
    }

}

export const getTransaction = async (req, res) => {
    let data = null;
    let error = null;
    try {
        const transactionId = req.body.transactionId;
        const transaction = await Transaction.findById(transactionId);
        await transaction.populate("payer").populate("members_involved").populate("notes").execPopulate();
        console.log(transaction)
        data = transaction
    } catch (err) {
        error = err
    }
    res.json({
        data,
        error
    });
}

export const addTransactionToGroup = async (groupId, transactionId) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(groupId, {
            $push: {
                transactions: transactionId
            }
        })
        return updatedGroup;
    } catch (error) {
        return error;
    }
};

export const createEmptyTransaction = (groupId) => {
    const transaction = new Transaction({
        group_id: groupId,
        settle_up: false,
        payer: "",
        members_involved: [],
        description: "",
        amount: "",
        notes: [],
        // timestamp: ""
    });
    return transaction;
}

export const addNote = async (req, res) => {
    const transactionId = req.body.transactionId;
    const member = req.body.member;
}