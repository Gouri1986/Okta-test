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
