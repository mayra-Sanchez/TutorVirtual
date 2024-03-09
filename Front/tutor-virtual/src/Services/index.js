const URL = "https://laboratorio1-pi2.onrender.com";

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
