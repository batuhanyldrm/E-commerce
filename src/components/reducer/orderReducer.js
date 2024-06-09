import { ADD_ORDER, FETCH_ORDERS } from "../actions/types";

const OrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {...state, orders:  [...state.orders, action.payload]};
        case FETCH_ORDERS:
            return  {...state, orders: action.payload};
        default:
            return state
    }
}

export default OrderReducer;