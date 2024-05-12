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

export const sendFriendRequest = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/sendFriendRequest",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const acceptReq = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/acceptFriendRequest",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const rejectReq = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/rejectFriendRequest",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const sendMsg = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/sendMessage",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const updateStatus = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/updateStatus",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};
