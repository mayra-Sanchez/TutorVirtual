import Axios from "axios";
import { endpoints, tokenRefresh } from "./index.js";

const refreshToken = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const refreshToken = tokenRefresh();
  const body = {
    refresh: refreshToken,
  };
  try {
    const response = await Axios.post(
      endpoints.users.tokenRefresh,
      body,
      config
    );
    console.log("Tokens actualizados en localStorage");
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");

    return response.data;
  } catch (error) {
    console.error("Error al refrescar tokens:", error);
  }
};

export { refreshToken };
