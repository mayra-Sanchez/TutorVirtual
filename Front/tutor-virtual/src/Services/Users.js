import Axios from "axios";
import { endpoints, tokenAccess, tokenRefresh } from "./index.js";

const createUser = async (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await Axios.post(
      endpoints.users.registerUser,
      body,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.post(endpoints.users.loginUser, body, config);
  return response.data;
};

const logout = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.post(endpoints.users.logout, body, config);
  return response.data;
};

const updateUser = async (userId, body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  try {
    const response = await Axios.put(endpoints.users.update(userId), body, config); 
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUserData = async (userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  try {
    const response = await Axios.get(endpoints.users.getUserDetails(userId), config); 
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createUser, login, logout, updateUser, getUserData };