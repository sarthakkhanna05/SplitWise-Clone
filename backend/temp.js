const balance = {};
const names = ["hanish", "abhishek", "ishan", "sarthak", "rohit"];


for (let i = 0; i < names.length; i++) {
    const name = names[i];
    console.log(name);
    console.log("----------------");
    const rest = names.filter((nam) => nam !== name);
    console.log(rest);
    console.log("***************");

}

for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const rest = names.filter((nam) => nam !== name);
    const d = {}
    rest.map((nam) => d[nam] = 0);
    balance[name] = d;
    const dada = "";
}

Object.keys(balance).map((obj) => {
    for (nam in balance[obj]) {
        balance[obj][nam] = 0;
    }
})

let amount = 100;
let payer = "hanish"
let divide = amount / 5
let members = [];

Object.keys(balance).map((obj) => {
    if (members.find((mem) => String(mem) === String(obj))) {
        if (obj === payer) {
            for (nam in balance[obj]) {
                if (members.find((mem) => String(mem) === String(nam))) {
                    balance[obj][nam] = balance[obj][nam] + divide;
                }
            }
        } else {
            for (nam in balance[obj]) {
                if (nam === payer) {
                    if (members.find((mem) => String(mem) === String(obj))) {
                        balance[obj][nam] = balance[obj][nam] - divide;
                    }
                }

            }
        }
    }
})


function hanish(money) {

}

const hanish = (money) => statement
// for(let i =0; i<name.length/2;i++){
//     j= name.length-i-1;
//     front = front + name[i];
//     back = back + name[j];
// }
// if(back === front){
//     console.log("palindrome")
// }
// else{
//     console.log("not!")
// }