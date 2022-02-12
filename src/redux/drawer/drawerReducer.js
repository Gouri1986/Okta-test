import { COMPLAINCE_DRAWER_DATA } from "./drawerActionTypes"

const initialState = {
  complainceDrawerData: []
}

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLAINCE_DRAWER_DATA: {
      return {
        ...state,
        complainceDrawerData: action.payload
      }
    }
    default:
      return state
  }
}

export default tableReducer
