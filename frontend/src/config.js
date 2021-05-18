export const BASE_GRAPHQL_URL = "http://localhost:5000/graphql"
export const BASE_API_URL = "http://localhost:5000/api/"
// export const BASE_API_URL = "http://ec2-54-183-239-31.us-west-1.compute.amazonaws.com:5000/api/"
export const BASE_URL = "http://localhost:3000"
// export const BASE_URL = "http://ec2-54-183-239-31.us-west-1.compute.amazonaws.com:3000"
export const LOGIN_URL = "auth/authuser"
export const SIGNUP_URL = "auth/createuser"
export const ADD_NOTE_URL = "note/addnote"
export let TOKEN = "";
export let USER = "6063e99d102035eb6c07249c";
export let GROUP = "";
export let LOGIN = true;

export const logout = () => {
    LOGIN = false;
}

export const login = () => {
    LOGIN = true;
}

export const changeUser = (id) => {
    USER = id;
}

export const changeGroup = (id) => {
    GROUP = id;
}