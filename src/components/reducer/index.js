import {combineReducers} from "redux";
import productReducer from "./productReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
    products: productReducer,
    user: UserReducer
});

export default reducers;