import {
  COMPLAINCE_DRAWER_DATA,
  COMPLAINCE_DRAWER_JSON_DATA,
  COMPLAINCE_DRAWER_REGULATION_DATA,
  COMPLAINCE_DRAWER_REGULATION_MAP
} from "./drawerActionTypes"

const initialState = {
  complainceDrawerData: [],
  complainceDrawerJSONData: [],
  complainceDrawerRegulationData: [],
  complainceDrawerRegulationMap: []
}

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLAINCE_DRAWER_DATA: {
      return {
        ...state,
        complainceDrawerData: action.payload
      }
    }
    case COMPLAINCE_DRAWER_JSON_DATA: {
      return {
        ...state,
        complainceDrawerJSONData: action.payload
      }
    }
    case COMPLAINCE_DRAWER_REGULATION_DATA: {
      return {
        ...state,
        complainceDrawerRegulationData: action.payload
      }
    }
    case COMPLAINCE_DRAWER_REGULATION_MAP: {
      return {
        ...state,
        complainceDrawerRegulationMap: action.payload
      }
    }
    default:
      return state
  }
}

export default drawerReducer
