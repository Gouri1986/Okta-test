import {
  COMPLAINCE_DRAWER_DATA,
  COMPLAINCE_DRAWER_JSON_DATA,
  COMPLAINCE_DRAWER_REGULATION_DATA,
  COMPLAINCE_DRAWER_REGULATION_MAP
} from "./drawerActionTypes"

export const setDrawerData = endpoint => ({
  type: COMPLAINCE_DRAWER_DATA,
  payload: endpoint
})

export const setDrawerJSONData = endpoint => ({
  type: COMPLAINCE_DRAWER_JSON_DATA,
  payload: endpoint
})

export const setDrawerRegulationData = endpoint => ({
  type: COMPLAINCE_DRAWER_REGULATION_DATA,
  payload: endpoint
})

export const setDrawerRegulationMap = endpoint => ({
  type: COMPLAINCE_DRAWER_REGULATION_MAP,
  payload: endpoint
})
