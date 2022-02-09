import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import tableReducer from "./table/tableReducer";

const rootReducer = combineReducers({
  userReducer,
  tableReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
