import counterReducer from "./counter";
import isLoggedin from "./isLoggedin";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter : counterReducer,
    isLogged: isLoggedin
})

export default allReducers;