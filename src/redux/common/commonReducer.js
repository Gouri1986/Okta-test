import { NAV_EXPAND, COMPLIANCE_DRAWER_EXPAND } from "./commonActionTypes"

const initialState = {
  navExpanded: false,
  complianceDrawerExpanded: false
}

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV_EXPAND: {
      return {
        ...state,
        navExpanded: action.payload
      }
    }
    case COMPLIANCE_DRAWER_EXPAND: {
      return {
        ...state,
        complianceDrawerExpanded: action.payload
      }
    }
    default:
      return state
  }
}

export default commonReducer
