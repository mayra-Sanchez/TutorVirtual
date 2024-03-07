import Axios from "axios";
import { endpoints } from "./index.js";

const chatTutor = async (id_course, body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await Axios.post(
      endpoints.student.chatTutor(id_course),
      body,
      config
    );
    return response.data;
  };

  

export {chatTutor}