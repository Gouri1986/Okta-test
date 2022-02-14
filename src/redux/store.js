import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import userReducer from "./user/userReducer"
import tableReducer from "./table/tableReducer"
import commonReducer from "./common/commonReducer"
import drawerReducer from "./drawer/drawerReducer"

const rootReducer = combineReducers({
  userReducer,
  tableReducer,
  commonReducer,
  drawerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
