// @flow
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import AppReducer from "./reducers/AppReducer";

export default const rootReducer = combineReducers({
    app: AppReducer
});