import { FETCH_ORDERS } from "../actions/types";

const OrderReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return  {...state, orders: action.payload};
        default:
            return state
    }
}

export default OrderReducer;