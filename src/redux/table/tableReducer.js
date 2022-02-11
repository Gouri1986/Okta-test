import {
  TABLE_ACTIVE_ENDPOINT,
  TABLE_CONTENTS,
  TABLE_TABS,
  FILTERED_TABLE_CONTENTS,
} from "./tableActionTypes";

const initialState = {
  activeEndpoint: "",
  tableContents: {},
  filteredTableContents: {},
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
    case FILTERED_TABLE_CONTENTS: {
      return {
        ...state,
        filteredTableContents: action.payload,
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
