import mongoose from "mongoose";
import User from "./user.js";
import Note from "./note.js";
import Group from "./group.js"

const Schema = mongoose.Schema;

const transactionSchema = Schema({
    settle_up: {
        type: Boolean
        // required: true
    },
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members_involved: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    description: {
        type: String
    },
    amount: {
        type: String
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    timestamp: {
        type: String,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;