import axios from "axios";

export const getUsers = async (data) => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/getUsers", {
      params: data, // Send user data as query parameters
    });
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};
