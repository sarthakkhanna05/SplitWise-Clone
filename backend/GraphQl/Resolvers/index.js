import User from "../../Models/user.js";
import {
    validatePassword,
    hashPassword
} from "../../Utilities/hashing.js";
import {
    checkIfUserExists,
    createEmptyUSer,
    removeinvitation,
    addGroupToUser,

} from "../../Services/user.js";

import {
    addUserToGroup
} from "../../Services/group.js";
import mongoose from 'mongoose';
import {
    assertInputObjectType
} from "graphql";

const resolvers = {
    users: async () => {
        try {
            const user = await User.find().populate("groups");
            return user.map((user) => {
                return {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    profile_picture: user.profile_picture,
                    phone_number: user.phone_number,
                    time_zone: user.time_zone,
                    language: user.language,
                    currency: user.currency,
                    invitations: user.invitations.map((invite) => {
                        return invite
                    }),
                    groups: user.groups.map((group) => {
                        return JSON.stringify(group)
                    })
                }

            })
        } catch (error) {
            return error
        }
    },
    user: async (args) => {
        try {

            const {
                userId
            } = args
            console.log(userId)
            const user = await User.findById(userId).populate("groups");
            if (user) {
                return {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    profile_picture: user.profile_picture,
                    phone_number: user.phone_number,
                    time_zone: user.time_zone,
                    language: user.language,
                    currency: user.currency,
                    invitations: user.invitations.map((invite) => {
                        return invite
                    }),
                    groups: user.groups.map((group) => {
                        return JSON.stringify(group)
                    })
                }
            } else {
                throw new Error(
                    "No User Found!."
                );
            }
        } catch (error) {
            return error
        }
    },

    loginUser: async (args) => {
        try {
            const {
                email,
                password
            } = args;
            const user = await User.findOne({
                email
            })
            // console.log(user)
            if (user) {
                if (await validatePassword(password, user.password)) {
                    // auth = true
                    // const token = jwt.sign({
                    //     _id: user._id
                    // }, process.env.TOKEN_SECRET)
                    // res.header('auth_token', token);
                    // data = {
                    //     user,
                    //     token
                    // };
                    //
                    await user.populate("groups").execPopulate();


                    return {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: user.password,
                        profile_picture: user.profile_picture,
                        phone_number: user.phone_number,
                        time_zone: user.time_zone,
                        language: user.language,
                        currency: user.currency,
                        invitations: user.invitations.map((invite) => {
                            return JSON.stringify(invite)
                        }),
                        groups: user.groups.map((group) => {
                            return JSON.stringify(group)
                        })
                    }


                } else {
                    throw new Error(
                        "Incorrect Credentials!."
                    );
                }
            } else {
                throw new Error(
                    "Incorrect Credentials!."
                );
            }
        } catch (err) {
            return err
        }
    },
    addUser: async args => {
        let {
            email,
            password,
            name
        } = args
        try {
            if (!await checkIfUserExists(email)) {

                const user = createEmptyUSer();
                user.email = email;
                const hashedPassword = await hashPassword(password);
                user.password = hashedPassword;
                name = (name).split(" ");
                user.first_name = name[0];
                if (name[1]) user.last_name = name[1];
                const savedUser = await user.save();
                return {
                    _id: savedUser._id,
                    first_name: savedUser.first_name,
                    last_name: savedUser.last_name,
                    email: savedUser.email,
                    password: savedUser.password
                }
            } else {
                throw new Error(
                    "User already Registered!."
                );
            }
        } catch (err) {
            return err
        }
    },
    updateUser: async args => {
        let {
            _id,
            email,
            password,
            name,
            time_zone,
            language,
            currency,
            phone
        } = args
        console.log(args)
        try {
            const names = (name).split(" ");
            let lastname = "";
            if (names[1]) lastname = names[1];
            const user = {
                first_name: names[0],
                last_name: lastname,
                email,
                //profile_picture: "hahahahaaha",
                time_zone,
                language,
                currency,
                phone_number: phone
            };
            const updatedUser = await User.findByIdAndUpdate(
                _id, {
                    $set: user
                });
            // const updatedUser = await User.findById("60864ff367abb53e50f186b5");
            console.log(updatedUser)

            return {
                _id: updatedUser._id,
                email: updatedUser.email,
                password: updatedUser.password,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                time_zone: updatedUser.time_zone,
                language: updatedUser.language,
                currency: updatedUser.currency,
                phone_number: updatedUser.phone_number
            }
        } catch (err) {
            console.log(err)
            return err
        }
    },
    getInvitations: async args => {
        try {
            // console.log(req.body)
            const {
                userId
            } = args;
            const user = await User.findById(userId);
            if (user.invitations.length > 0) {
                return {
                    invitations: user.invitations.map((invite) => {
                        return JSON.stringify(invite)
                    }),
                }
            } else {
                return {
                    invitations: []
                };
            }
        } catch (err) {
            console.log(err)
            return err
        }
    },
    acceptInvitation: async args => {
        try {
            const {
                invitationId,
                userId
            } = args;
            const user = await User.findById(userId);
            // console.log(req.body)
            if (user.invitations.find((invite) => String(invite) === String(invitationId))) {
                const updatedInvitations = await removeinvitation(user._id, invitationId);
                const updatedUserGroups = await addGroupToUser(user._id, invitationId);
                const updatedGroup = await addUserToGroup(user._id, invitationId);
                return {
                    message: "Invitation Successfully accepted!"
                }
            } else {
                throw new Error(
                    "Invitation not found!."
                );
            }
        } catch (error) {
            return error;
        }
    },
    getAllGroups: async args => {
        try {
            const groups = await Group.find().populate("balances");
            res.json(groups);
        } catch (error) {
            res.json(error);
        }
    }
}

export default resolvers