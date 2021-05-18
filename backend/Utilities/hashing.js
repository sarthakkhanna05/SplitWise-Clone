import bcrypt from "bcryptjs";

export const hashPassword = async (data) => {
    try {
        return await bcrypt.hash(data, await bcrypt.genSalt(10));
    } catch (err) {
        console.log(err)
    }
}

export const validatePassword = async (reqPassword, userPassword) => {

    if (await bcrypt.compare(reqPassword, userPassword)) {
        return true
    } else {
        return false;
    }
}