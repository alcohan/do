import { USER_ACTION_TYPES } from './user.types';
import createAction from '../../utils/reducer/reducer.utils';

// define the different actions available to this reducer.
// We set them as functions here to make code more readable in components

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
