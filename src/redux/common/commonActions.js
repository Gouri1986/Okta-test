import {
  NAV_EXPAND,
  COMPLIANCE_DRAWER_EXPAND,
  FILTER_DRAWER_EXPAND,
} from "./commonActionTypes";

export const setNavDrawerExpand = (endpoint) => ({
  type: NAV_EXPAND,
  payload: endpoint,
});

export const setComplianceDrawerExpand = (endpoint) => ({
  type: COMPLIANCE_DRAWER_EXPAND,
  payload: endpoint,
});

export const setFilterDrawerExpand = (bool) => ({
  type: FILTER_DRAWER_EXPAND,
  payload: bool,
});
