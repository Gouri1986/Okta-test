import {
  NAV_EXPAND,
  COMPLIANCE_DRAWER_EXPAND,
  FILTER_DRAWER_EXPAND,
} from "./commonActionTypes";

const initialState = {
  navExpanded: false,
  complianceDrawerExpanded: false,
  filterDrawerExpand: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV_EXPAND: {
      return {
        ...state,
        navExpanded: action.payload,
      };
    }
    case COMPLIANCE_DRAWER_EXPAND: {
      return {
        ...state,
        complianceDrawerExpanded: action.payload,
      };
    }
    case FILTER_DRAWER_EXPAND: {
      return {
        ...state,
        filterDrawerExpand: action.payload,
      };
    }
    default:
      return state;
  }
};

export default commonReducer;
