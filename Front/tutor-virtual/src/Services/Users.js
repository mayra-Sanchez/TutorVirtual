import Axios from "axios";
import { endpoints } from "./index.js";

const createUser = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.post(endpoints.users.registerUser, body, config);
  return response.data;
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

export { createUser, login };