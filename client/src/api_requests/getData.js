import axios from "axios";

export const getUsers = async (id) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/getUsers",
      id
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};
