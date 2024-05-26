import Axios from "axios";
import { endpoints, tokenAccess } from "./index.js";

//Esto no está funcionando alv
const refreshToken = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  try {
    const response = await Axios.post(
      endpoints.users.tokenRefresh,
      body,
      config
    );
    localStorage.setItem("token_access", response.data.access_token);
    localStorage.setItem("token_refresh", response.data.refresh_token);
    console.log("Tokens actualizados en localStorage");
  } catch (error) {
    console.error("Error al refrescar tokens:", error);
  }
};

refreshToken();

const intervalId = setInterval(() => {
  refreshToken();
}, 5 * 60 * 1000);

export { refreshToken, intervalId };
