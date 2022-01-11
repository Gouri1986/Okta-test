import axios from "axios";

export const getIAMTableData = async (path, token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_IAM_BASE_URL}${path}`,
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

export const addIAMTableData = async (path, token, postData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_IAM_BASE_URL}${path}`,

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

export const updateIAMTableData = async (path, token, putData) => {
  const response = await axios.put(
    `${process.env.REACT_APP_IAM_BASE_URL}${path}`,
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

export const deleteIAMTableData = async (path, token, putData) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_IAM_BASE_URL}${path}`,
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
