// import { USER_ACTION_TYPES } from './user.types';

import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

// A reducer function should set the new state based on the action {type,payload} passed. 
// Do not add business logic here, simply set the values.

export const userReducer = ( state=INITIAL_STATE, action ) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            return state;
    }
}