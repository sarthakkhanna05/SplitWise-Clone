import User from "../Models/user.js";
import Group from "../Models/group.js";
import Transaction from "../Models/transaction.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {
    addUserToGroup
} from "./group.js";
import {
    hashPassword,
    validatePassword
} from "../Utilities/hashing.js";

// Get a particular User. Groups are populated.
export const getUser = async (req, res) => {

    try {

        if (req.body.userId) {
            const userId = req.body.userId;
            console.log(userId)
            const user = await User.findById(userId).populate("groups");
            res.json(user);
        } else {
            res.json("No user id found in request")
        }
    } catch (error) {
        res.json(error);
    }
};

//Gets all users. Groups are populated
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find().populate("groups");
        res.json(user);
    } catch (error) {
        res.json(error);
    }

};

//Registers a new user.
export const addUser = async (req, res) => {
    let data = null;
    let error = null;
    try {
        if (!await checkIfUserExists(req.body.email)) {

            const user = createEmptyUSer();
            user.email = req.body.email;
            const password = await hashPassword(req.body.password);
            user.password = password;
            const name = (req.body.name).split(" ");
            user.first_name = name[0];
            if (name[1]) user.last_name = name[1];
            const savedUser = await user.save();
            data = savedUser;
        } else {
            error = "Email Id is already registered!"
        }
    } catch (err) {
        error = err;
    }
    res.json({
        data,
        error
    });
};

export const checkIfUserExists = async (email) => {
    const user = await User.findOne({
        email
    })
    if (user) return true;
    else return false;
}

// Authorizes user for login
export const authUser = async (req, res) => {
    let auth = false;
    let data = null;
    let error = null;
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            if (await validatePassword(req.body.password, user.password)) {
                auth = true
                const token = jwt.sign({
                    _id: user._id
                }, process.env.TOKEN_SECRET)
                res.header('auth_token', token);
                data = {
                    user,
                    token
                };
                await user.populate("groups").execPopulate();
            } else {
                error = "Incorrect Credentials"
            }
        } else {
            error = "Incorrect Credentials"
        }
    } catch (err) {
        auth = false;
        error = err;
    }
    res.json({
        data,
        error,
        auth
    });
};



export const updateUser = async (req, res) => {
    try {
        const name = (req.body.name).split(" ");
        let lastname = "";
        if (name[1]) lastname = name[1];
        console.log(req.body)
        const user = {
            first_name: name[0],
            last_name: lastname,
            email: req.body.email,
            //profile_picture: "hahahahaaha",
            time_zone: req.body.timeZone,
            language: req.body.language,
            currency: req.body.currency,
            phone_number: req.body.phone
        };
        console.log(user)
        const updatedUser = await User.updateOne({
            _id: req.body.userId
        }, {
            $set: user
        });
        res.json(updatedUser)
    } catch (error) {
        res.json(error)
    }
};

export const getInvitations = async (req, res) => {

    try {
        console.log(req.body)
        const user = await User.findById(req.body.userId);
        console.log(user)
        if (user.invitations.length > 0) {
            res.json(user.invitations);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.
        json(error)
    }
}


export const acceptInvitation = async (req, res) => {
    let data = null;
    let error = null;
    try {
        const invitationId = req.body.invitationId;
        const user = await User.findById(req.body.userId);
        console.log(req.body)
        if (user.invitations.find((invite) => String(invite) === String(invitationId))) {
            const updatedInvitations = await removeinvitation(user._id, invitationId);
            const updatedUserGroups = await addGroupToUser(user._id, invitationId);
            const updatedGroup = await addUserToGroup(user._id, invitationId);
            data = {
                updatedInvitations,
                updatedUserGroups,
                updatedGroup
            }
        } else {
            error = "Invitation not found";
        }
    } catch (err) {
        error = err;
    }
    res.json({
        data,
        error
    });
}

export const removeinvitation = async (userId, invitationId) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, {
                $pull: {
                    invitations: invitationId
                }
            })
        return updatedUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const addGroupToUser = async (userId, groupId) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, {
                $push: {
                    groups: groupId
                }
            })
        return updatedUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const createEmptyUSer = () => {
    const user = new User({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        profile_picture: "",
        phone_number: "",
        time_zone: "",
        language: "",
        currency: "",
        groups: [],
        invitations: [],
        // date: ""
    });
    return user;
}

export const copyUSer = (oldUser, NewUser) => {

    oldUser.first_name = NewUser.first_name;
    oldUser.last_name = NewUser.last_name;
    oldUser.email = NewUser.email;
    oldUser.profile_picture = NewUser.profile_picture;
    oldUser.time_zone = NewUser.time_zone;
    oldUser.language = NewUser.language;
    oldUser.currency = NewUser.currency;
    // const user = new User({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    //     profile_picture: "",
    //     phone_number: "",
    //     time_zone: "",
    //     language: "",
    //     groups: [],
    //     invitations: [],
    //     date: ""
    // });
    return oldUser;
}

export const createEmptyGroup = () => {
    const group = new Group({
        name: "",
        members: [],
        picture: "",
        transactions: [],
        balances: {}
    });
    return group;
}