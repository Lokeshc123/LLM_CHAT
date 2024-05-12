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

export const getUserDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/userDetails/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const getFriendRequests = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/getFriendRequests/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};
export const getFriends = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/getFriends/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const removeFrn = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/removeFriend",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};

export const getConvo = async (senderId, receiverId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/getmessages/${senderId}/${receiverId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data || { success: false, msg: "An error occurred" };
  }
};
