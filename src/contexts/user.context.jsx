import { createContext, useState, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import createAction from '../utils/reducer/reducer.utils';

//as the actual value you want to access
export const UserContext = createContext( {
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    // console.log('dispatched userReducer');
    // console.log(action);

    const { type, payload } = action;

    switch(type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ( { children } ) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state;
    
    // console.log('Current User is currently:')
    // console.log(currentUser)

    const setCurrentUser = (user) => {
        dispatch( createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = { currentUser, setCurrentUser };

    useEffect( () => {
        const unsubscribe = onAuthStateChangedListener( (user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        // This code pattern runs return when it unmounts; thus unsubscribe deletes the listener
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={ value } >{ children }</UserContext.Provider>
}
