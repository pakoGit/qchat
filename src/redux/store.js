import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import ChatReducer from "./reducers/Chat";

const reducers = combineReducers({
    chat: ChatReducer
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;