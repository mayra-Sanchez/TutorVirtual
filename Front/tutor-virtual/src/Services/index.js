const URL = "http://127.0.0.1:8000";

const endpoints = {
  student: {
    coursesList: `${URL}/course/estudent/list`,
  },
  course: {
    registerCourse: `${URL}/course/teacher/register`,
  },
};

const token = () => {};

export { endpoints, token };
