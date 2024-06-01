import Axios from "axios";
import { endpoints, tokenAccess } from "./index.js";

const addCourse = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  const response = await Axios.post(
    endpoints.Professor.registerCourse,
    body,
    config
  );
  return response.data;
};

const listCourses = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess}`,
    },
  };
  const response = await Axios.get(endpoints.student.coursesList, body, config);
  return response.data;
};

const listCoursesProfessor = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  const response = await Axios.get(endpoints.Professor.listCourses, config);
  return response.data;
};

const deleteCourseProfessor = async (ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  const response = await Axios.delete(
    endpoints.Professor.deleteCourses(ID),
    config
  );
  return response.data;
};

export { addCourse, listCourses, listCoursesProfessor, deleteCourseProfessor };
