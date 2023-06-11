import { LOGIN_USER, UPDATE_USER } from "../actions/types";

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return  {...action.payload};
        case UPDATE_USER:
            return  {...action.payload};
        default:
            return state
    }
}

export default UserReducer;