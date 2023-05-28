import { FETCH_PRODUCT } from "../actions/types";

const productDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return {...action.payload}
        default:
            return state
    }
};

export default productDetailReducer;
