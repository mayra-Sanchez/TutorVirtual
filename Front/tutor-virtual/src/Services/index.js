const URL = "http://127.0.0.1:8000";

const endpoints = {
  student: {
    coursesList: `${URL}/course/list`,
    chatTutor: (id_course) => `${URL}/course/student/${id_course}/chat`
  },
  course: {
    registerCourse: `${URL}/course/teacher/register`,
  }
};

const token = () => {};

export { endpoints, token };
