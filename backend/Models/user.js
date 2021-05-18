import mongoose from "mongoose";
import Group from "./group.js";
const Schema = mongoose.Schema;

const userSchema = Schema({
    first_name: {
        type: String,
        // required: true
    },
    last_name: String,
    email: {
        type: String,
        // required: true,
        max: 255
    },
    password: {
        type: String,
        // required: true,
        max: 1024,
        min: 6
    },
    profile_picture: {
        data: Buffer,
        Type: String
    },
    phone_number: {
        type: String,

    },
    time_zone: {
        type: String
    },
    language: {
        type: String
    },
    currency: {
        type: String
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    invitations: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    date: {
        type: String,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema)

export default User;