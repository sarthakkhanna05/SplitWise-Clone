// module.exports = {
//     // This function needs to return a promise
//     sum: async (a, b) => {
//         return a + b;
//     },
// }

const sum = async (a, b) => {
    return a + b;
}
const sub = async (a, b) => {
    return a - b;
}
module.exports = {
    // This function needs to return a promise
    sum,
    sub
}