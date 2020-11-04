import { combineReducers } from 'redux';
import { UPDATE_USER_DETAILS } from './types';

const initialState = {

    users_array: [{
        id: 1,
        name: 'Savita',
        email: 'savita@gmail.com',
        age: "18",
        gender: 'Male',
    }, {
        id: 2,
        name: 'Vijay',
        email: 'vijay@gmail.com',
        age: "18",
        gender: 'Male',
    },
    {
        id: 3,
        name: 'Rohit',
        email: 'rohit@gmail.com',
        age: "18",
        gender: 'Female',
    },
    {
        id: 4,
        name: 'Sandip',
        email: 'sandip@gmail.com',
        age: "18",
        gender: 'Female',
    }]
}
    ;


const userListingReducer = (state = initialState, action) => {
    //console.log(action.payload);
    switch (action.type) {
        case UPDATE_USER_DETAILS: {
            return { ...state, users_array: action.payload }
        }
        default: {
            return state;
        }
    }

}

export const rootReducer = combineReducers({
    user: userListingReducer
});