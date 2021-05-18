import Balance from "../Models/balance.js";
import User from "../Models/user.js";


export const createBalances = async (members, groupId) => {
    console.log(members)
    const balances = {};
    try {
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            const rest = members.filter((mem) => mem !== member);
            const balance = {}
            rest.map((mem) => balance[mem] = 0.00);
            balances[member] = balance;
        }
        balances.group = groupId;
        const monBalances = new Balance(balances);
        const savedBalances = await monBalances.save();
        return savedBalances._id;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const UpdateBalancesForTransaction = async (balance, members, payer, amount) => {
    try {
        let divide = amount / (members.length);
        balance = balance["_doc"];
        for (let obj in balance) {
            if (members.find((mem) => String(mem) === String(obj))) {
                if (obj === payer) {
                    for (let nam in balance[obj]) {
                        if (members.find((mem) => String(mem) === String(nam))) {
                            balance[obj][nam] = balance[obj][nam] + divide;
                        }
                    }
                } else {
                    for (let nam in balance[obj]) {
                        if (nam === payer) {
                            if (members.find((mem) => String(mem) === String(obj))) {
                                balance[obj][nam] = balance[obj][nam] - divide;
                            }
                        }

                    }
                }
            }
        }

        const updatedBalance = await Balance.findByIdAndUpdate(balance._id, {
            $set: balance
        })
        return updatedBalance;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const calculateBalances = async (req, res) => {
    try {
        const balanceId = req.body.balanceId;
        let balances = await Balance.findById(balanceId);
        balances = balances["_doc"];
        for (let balance in balances) {
            if (balance.length > 10) {
                console.log("********************");
                // console.log(`${(await User.findById(balance)).first_name}`);
                for (let bal in balances[balance]) {
                    if (balances[balance][bal] !== 0) {
                        if (balances[balance][bal] > 0) {
                            console.log(`${(await User.findById(balance)).first_name} gets back $${Math.abs(balances[balance][bal])} from ${(await User.findById(bal)).first_name}`);
                        } else {
                            console.log(`${(await User.findById(balance)).first_name} owes ${(await User.findById(bal)).first_name} $${Math.abs(balances[balance][bal])}`);
                        }
                    }
                }
                // console.log(`${(await User.findById(balance)).first_name} ${(balances[balance][bal]>0)?"Gets back":"Owes"} $${balances[balance][bal]} ${(balances[balance][bal]>0)&&"Gets back"}`);
                // console.log(`   ${(await User.findById(bal)).first_name} : ${balances[balance][bal]}`);
            }
        }
    } catch (error) {
        res.json(error);
    }
}