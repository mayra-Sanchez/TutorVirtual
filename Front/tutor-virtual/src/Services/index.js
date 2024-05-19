// let URL;

// if (process.env.REACT_APP_API_URL) {
//   URL = process.env.REACT_APP_API_URL;
// } else {
//   URL = "https://laboratorio1-pi2.onrender.com";
// }

const URL = "http://127.0.0.1:8000";

const endpoints = {
  users: {
    registerUser: `${URL}/users/create-user/`,
    loginUser: `${URL}/users/login/`,
  },
  student: {
    coursesList: `${URL}/course/list`,
    chatTutor: (id_course) => `${URL}/course/student/${id_course}/chat`,
  },
  course: {
    registerCourse: `${URL}/course/teacher/register`,
  },
};

const token = () => {};

export { endpoints, token };
