import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
