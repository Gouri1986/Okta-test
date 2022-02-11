import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import userReducer from "./user/userReducer"
import tableReducer from "./table/tableReducer"
import commonReducer from "./common/commonReducer"

const rootReducer = combineReducers({
  userReducer,
  tableReducer,
  commonReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
