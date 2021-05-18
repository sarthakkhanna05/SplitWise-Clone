import User from "../Models/user.js";
import Group from "../Models/group.js";
import Balance from "../Models/balance.js";
import Transaction from "../Models/transaction.js";
import {
    addGroupToUser
} from "./user.js";
import {
    createBalances
} from "./balance.js";

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate("balances");
        res.json(groups);
    } catch (error) {
        res.json(error);
    }
};


export const getGroup = async (req, res) => {
    let data = null;
    let error = null;
    try {
        const groupId = req.body.groupId
        if (groupId) {
            const group = await Group.findById(groupId)
            if (group.transactions) {
                console.log("here")
                await group.populate("transactions").execPopulate();
            } //.populate("transactions");
            data = group;
        } else {
            error = "No group id found in request"
        }
    } catch (err) {
        console.log(err);
        error = err;
    }
    res.json({
        data,
        error
    });
};


export const addGroup = async (req, res) => {
    let data = null;
    let error = null;
    try {
        console.log(req.body)
        const emails = req.body.emails;
        //const emails = ["hanish.punamiya@gmail.com", "hanish.punamiya@sjsu.edu", "spy_hanish@zapak.com", "goku_hanish@gmail.com"];
        const users = await User.find({
            email: emails
        });
        // console.log(users)
        let userIds = users.map((user) => user._id);
        console.log(userIds)
        const group = createEmptyGroup();
        group.name = req.body.name;
        group.members = userIds[1]
        const savedGroup = await group.save();
        console.log(savedGroup);
        const updatedUsers = await sendInvitations(userIds[0], savedGroup._id)
        // userIds.push(req.body.creator._id)
        const balancesId = await createBalances(userIds, savedGroup._id);
        const updatedGroup = await Group.findByIdAndUpdate(
            savedGroup._id, {
                $set: {
                    balances: balancesId
                }
            })
        await addGroupToUser(userIds[1], savedGroup._id)
        data = {
            savedGroup,
            updatedUsers,
            updatedGroup
        }
    } catch (err) {
        error = err;
        console.log(err)
    }
    res.json({
        data,
        error
    });
};

export const addUserToGroup = async (userId, groupId) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId, {
                $push: {
                    members: userId
                }
            })
        return updatedGroup;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const sendInvitations = async (userIds, groupId) => {
    try {
        const updatedUsers = await User.updateMany({
            _id: userIds
        }, {
            $push: {
                invitations: groupId
            }
        })
        return updatedUsers;
    } catch (error) {
        console.log(error)
    }
}

export const createEmptyGroup = () => {
    const group = new Group({
        name: "",
        members: [],
        picture: "",
        transactions: [],
        //balances: {}
    });
    return group;
}