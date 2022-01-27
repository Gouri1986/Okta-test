import axios from "axios";

export const getTableData = async (path, token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENCS_BASE_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    }
  );
  const { data } = response;
  return data.data;
};

export const addTableData = async (path, token, postData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENCS_BASE_URL}${path}`,

    postData,
    {
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    }
  );
  const { data } = response;
  return data.data;
};

export const updateTableData = async (path, token, putData) => {
  const response = await axios.put(
    `${process.env.REACT_APP_ENCS_BASE_URL}${path}`,
    putData,
    {
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    }
  );
  const { data } = response;
  return data.data;
};

export const deleteTableData = async (path, token, putData) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_ENCS_BASE_URL}${path}`,
    {
      data: putData,
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    }
  );
  const { data } = response;
  return data.data;
};
