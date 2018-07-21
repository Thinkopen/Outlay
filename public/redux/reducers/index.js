// This will can combine one or more Reducer functions and export it through Redux's combineReducer helper.
import { combineReducers } from "redux";

import count from "./counter";
import loginData from "../ducks/login";
// import secondCounter from './exampleReducer';

const reducers = combineReducers({
    loginData
});

export default reducers;

// Example for combining multiple reducers:
// export default combineReducers({ count, secondCounter });
