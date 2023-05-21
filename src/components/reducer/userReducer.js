import { ADD_USER, LOGIN_USER } from "../actions/types";

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER:
            return  {...state, user:  [...state.user, action.payload]};
        case LOGIN_USER:
            return  {...state, user: action.payload};
        default:
            return state
    }
}

export default UserReducer;