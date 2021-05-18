import * as actionTypes from "./types";


const INITIAL_STATE = {
    userId: "",
    groupId: "",
    auth: false,
    token: "",
    groupIds: "",
    user: {},
    groups: [{}]
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                auth: action.payload.auth,
                    userId: action.payload.userId,
                    token: action.payload.token,
                    groupIds: action.payload.groupIds,
                    user: action.payload.user,
                    groups: action.payload.groups
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                auth: action.payload.auth,
                    userId: action.payload.userId,
                    token: action.payload.token,
                    groupIds: action.payload.groupIds,
                    user: action.payload.user,
                    groups: action.payload.groups
            };
        case actionTypes.SET_CURRENT_GROUP:
            return {
                ...state,

                groupId: action.payload.groupId,
            };

        case actionTypes.SET_ALL_GROUPS:
            return {};
        default:
            return state;
    }
}

export default reducer;