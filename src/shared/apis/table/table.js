import axios from "axios";

const requestConfig = (token, data) => ({
  headers: {
    "Content-Type": "application/json",
    "access-token": `${token}`,
  },
  ...(data && { data }),
});

export const getTableData = async (path, token) => {
  const response = await axios.get(path, requestConfig(token));
  const { data } = response;
  return data.data;
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
