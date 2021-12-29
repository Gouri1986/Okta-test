import axios from "axios";
import "../index";

const headers = {
  "content-type": "application/json",
};

export const loginUser = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_LOGIN_BASE_URL}/api/v1/login`,
    formData,
    { headers }
  );
  const { status, data } = response;
  return status === 200 && data;
};
