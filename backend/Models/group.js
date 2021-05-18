import mongoose from "mongoose";
import User from "./user.js";
import Transaction from "./transaction.js";
import Balance from "./balance.js";
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    picture: {
        data: Buffer,
        Type: String
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    balances: {
        type: Schema.Types.ObjectId,
        ref: 'Balance'
    } //,
    // description: {
    //     type: String
    // },
    // amount: {
    //     Type: String
    // },
    // notes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Note'
    // }],
    // timestamp: {
    //     type: String,
    //     default: Date.now
    // }
});

const Group = mongoose.model('Group', groupSchema)

export default Group;