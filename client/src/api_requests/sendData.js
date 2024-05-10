import axios from "axios";

export const login = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/login",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/register",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
