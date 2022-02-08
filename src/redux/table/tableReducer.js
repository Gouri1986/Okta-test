import {
  TABLE_ACTIVE_ENDPOINT,
  TABLE_CONTENTS,
  TABLE_TABS,
} from "./tableActionTypes";

const initialState = {
  activeEndpoint: "",
  tableContents: {},
  tabs: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case TABLE_ACTIVE_ENDPOINT: {
      return {
        ...state,
        activeEndpoint: action.payload,
      };
    }
    case TABLE_CONTENTS: {
      return {
        ...state,
        tableContents: action.payload,
      };
    }
    case TABLE_TABS: {
      return {
        ...state,
        tabs: action.payload,
      };
    }
    default:
      return state;
  }
};

export default tableReducer;
