import * as actionTypes from "./types";


export const login = (userId, auth, token, groupIds, user, groups) => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            userId,
            auth,
            token,
            groupIds,
            user,
            groups
        }
    }
}

export const logout = (userId, auth, token, groupIds, user, groups) => {
    return {
        type: actionTypes.LOGOUT,
        payload: {
            userId,
            auth,
            token,
            groupIds,
            user,
            groups
        }
    }
}

export const setCurrentGroup = (groupId) => {
    return {
        type: actionTypes.SET_CURRENT_GROUP,
        payload: {
            groupId
        }
    }
}

export const setAllGroups = (groupIds) => {
    return {
        type: actionTypes.SET_ALL_GROUPS,
        payload: {
            groupIds
        }
    }
}