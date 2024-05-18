import Axios from "axios";
import { endpoints } from "./index.js";

const login = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.post(endpoints.login, body, config);
  return response.data;
};

export { login };
