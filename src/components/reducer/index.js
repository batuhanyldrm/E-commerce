import {combineReducers} from "redux";
import productReducer from "./productReducer";
import UserReducer from "./userReducer";
import productDetailReducer from "./productDetailReducer";

const reducers = combineReducers({
    products: productReducer,
    user: UserReducer,
    productDetail: productDetailReducer
});

export default reducers;