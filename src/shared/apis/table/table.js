import axios from "axios";
import { setTableContents } from "../../../redux/table/tabelActions";
import { getSpacedDisplayName } from "../../utils/table";

const requestConfig = (token, data) => ({
  headers: {
    "Content-Type": "application/json",
    "access-token": `${token}`,
  },
  ...(data && { data }),
});

export const getTableData = (path) => {
  console.log(path);
  return async (dispatch, getState) => {
    const { user: token } = getState().userReducer;
    const response = await axios.get(path, requestConfig(token));
    const { data } = response;

    const objectKeys = data.data?.map((e) => {
      return Object.keys(e);
    });
    const header = objectKeys?.[0]?.map((el) => {
      return { title: getSpacedDisplayName(el), id: el };
    });
    dispatch(setTableContents({ header, data: data.data }));
  };
};

export const addTableData = async (path, token, postData) => {
  const response = await axios.post(path, postData, requestConfig(token));
  const { data } = response;
  return data.data;
};

export const updateTableData = async (path, token, putData) => {
  const response = await axios.put(path, putData, requestConfig(token));
  const { data } = response;
  return data.data;
};

export const deleteTableData = async (path, token, deleteData) => {
  const response = await axios.delete(path, requestConfig(token, deleteData));
  const { data } = response;
  return data.data;
};
