import Axios from "axios";
import { endpoints } from "./index.js";

const addCourse = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.post(
    endpoints.course.registerCourse,
    body,
    config
  );
  return response.data;
};

const listCourses = async (body) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  const response = await Axios.get(
    endpoints.student.coursesList,
    body,
    config
  );
  return response.data;
};

export { addCourse, listCourses };
