import {
  FILTERED_TABLE_CONTENTS,
  TABLE_ACTIVE_ENDPOINT,
  TABLE_CONTENTS,
  TABLE_TABS,
} from "./tableActionTypes";

export const setTableActiveEndpoint = (endpoint) => ({
  type: TABLE_ACTIVE_ENDPOINT,
  payload: endpoint,
});

export const setTableContents = (data) => ({
  type: TABLE_CONTENTS,
  payload: data,
});

export const setFilteredTableContents = (filteredData) => ({
  type: FILTERED_TABLE_CONTENTS,
  payload: filteredData,
});

export const setActiveTableTabs = (tabs) => ({
  type: TABLE_TABS,
  payload: tabs,
});
