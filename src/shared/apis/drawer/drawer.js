import axios from "axios"
import { setDrawerData } from "../../../redux/drawer/drawerActions"

const requestConfig = ({ token, params }) => ({
  headers: {
    "Content-Type": "application/json",
    "access-token": `${token}`
  },
  ...(params && { params })
})

export const getDrawerData = (path, params) => {
  return async (dispatch, getState) => {
    const { user: token } = getState().userReducer
    const response = await axios.get(path, requestConfig({ token, params }))
    const { data } = response
    dispatch(setDrawerData(data.data))
  }
}
