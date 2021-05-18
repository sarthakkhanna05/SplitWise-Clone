import mongoose from "mongoose";
import User from "./user.js";
const Schema = mongoose.Schema;

const noteSchema = Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    timestamp: {
        type: String,
        default: Date.now
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }
});

const Note = mongoose.model('Note', noteSchema)

export default Note;