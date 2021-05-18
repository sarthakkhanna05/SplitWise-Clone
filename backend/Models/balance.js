import mongoose from "mongoose";
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    // group: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Group'
    // },
}, {
    strict: false
});

const Balance = mongoose.model('Balance', balanceSchema)

export default Balance;