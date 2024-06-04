import {combineReducers} from "redux";
import productReducer from "./productReducer";
import UserReducer from "./userReducer";
import productDetailReducer from "./productDetailReducer";
import orderReducer from "./orderReducer";

const reducers = combineReducers({
    products: productReducer,
    user: UserReducer,
    productDetail: productDetailReducer,
    orders: orderReducer
});

export default reducers;