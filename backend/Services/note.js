import User from "../Models/user.js";
import Group from "../Models/group.js";
import Transaction from "../Models/transaction.js";
import Note from "../Models/note.js";

export const addNote = async (req, res) => {
    let error = null;
    try {
        const member = req.body.userId;
        const transactionId = req.body.transactionId;
        const description = req.body.description;
        const note = new Note({
            member,
            description,
            transactionId,
        });
        const savedNote = await note.save();
        // await savedNote.populate("member").execPopulate();
        const updatedtransaction = await addNoteToTransaction(savedNote._id, req.body.transactionId)
        console.log(updatedtransaction)

        res.json({
            savedNote,
            updatedtransaction
        })
        // console.log(savedNote, updatedtransaction)

        /*{const groupId = req.body.groupId;
        const data = await Group.findById(groupId);
        console.log(data);
        const transaction = createEmptyTransaction(groupId)
        transaction.members_involved = data.members;
        transaction.payer = data.members[2];
        transaction.description = "2 Rupay ki pepsi mera bhai sexy";
        transaction.amount = "544";
        const savedTransaction = await transaction.save();
        await addTransactionToGroup(groupId, savedTransaction._id)
        await res.json(savedTransaction);}*/

    } catch (err) {
        console.log(err)
        res.json(err)
    }
};

export const deleteNote = async (req, res) => {
    let data = null;
    let error = null;
    try {
        // console.log(req.body)
        const noteId = req.body.noteId;
        // console.log(noteId)
        const transactionId = req.body.transactionId
        const deletedNote = await Note.findByIdAndDelete(noteId);
        const updatedtransaction = await deleteNoteFromTransaction(noteId, transactionId)
        // console.log(deletedNote, updatedtransaction)
        res.json({
            deletedNote,
            updatedtransaction
        });

        /*{const groupId = req.body.groupId;
        const data = await Group.findById(groupId);
        console.log(data);
        const transaction = createEmptyTransaction(groupId)
        transaction.members_involved = data.members;
        transaction.payer = data.members[2];
        transaction.description = "2 Rupay ki pepsi mera bhai sexy";
        transaction.amount = "544";
        const savedTransaction = await transaction.save();
        await addTransactionToGroup(groupId, savedTransaction._id)
        await res.json(savedTransaction);}*/

    } catch (err) {
        res.json({

            err
        })
    }

};

export const addNoteToTransaction = async (noteId, transactionId) => {
    try {
        const updatedtransaction = await Transaction.findByIdAndUpdate(transactionId, {
            $push: {
                notes: noteId
            }
        })
        return updatedtransaction;
    } catch (error) {
        return error;
    }
}

export const deleteNoteFromTransaction = async (noteId, transactionId) => {
    try {
        console.log(noteId, transactionId)
        const updatedtransaction = await Transaction.findByIdAndUpdate(transactionId, {
            $pull: {
                notes: noteId
            }
        })
        console.log(updatedtransaction)
        return updatedtransaction;
    } catch (error) {
        console.log(error)
        return error;
    }
}