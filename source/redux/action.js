import {UPDATE_USER_DETAILS} from './types';

export const updateUserDeails = (data) => {
    return{
        type:UPDATE_USER_DETAILS,
        payload:data
    }
}
