import Axios from "axios";
import { endpoints, tokenAccess } from "./index.js";

const addCourse = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await Axios.post(
      endpoints.Professor.registerCourse,
      body,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

const listCourses = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
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

const deleteCourseProfessor = async (ID, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  const response = await Axios.post(
    endpoints.Professor.deleteCourses(ID),
    body,
    config
  );
  return response.data;
};

const modifyCourseProfessor = async (ID, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAccess()}`,
    },
  };
  const response = await Axios.put(
    endpoints.Professor.modifyCourse(ID),
    body,
    config
  );
  return response.data;
};

export { addCourse, listCourses, listCoursesProfessor, deleteCourseProfessor, modifyCourseProfessor };
