//   URL = "https://tutor-virtual-back.onrender.com";
//   URL = "http://127.0.0.1:8000"
let URL;

if (process.env.REACT_APP_API_URL) {
  URL = process.env.REACT_APP_API_URL;
} else {
  URL = "https://tutor-virtual-back.onrender.com";
}
const endpoints = {
  users: {
    registerUser: `${URL}/users/create`,
    loginUser: `${URL}/users/login`,
    logout: `${URL}/users/logout`,
    tokenRefresh: `${URL}/users/token/refresh`,
    getUserDetails: (userId) => `${URL}/users/retrieve/${userId}`,
    update: (userId) => `${URL}/users/update/${userId}`,
  },
  student: {
    coursesList: `${URL}/course/student/list`,
    chatTutor: (id_course) => `${URL}/course/student/${id_course}/chat`,
    addFavorites: `${URL}/course/student/course/favorites/add`,
    listFavorites: `${URL}/course/student/course/favorites/list`,
    deleteFavorites: `${URL}/course/student/course/favorites/delete`,
  },
  Professor: {
    registerCourse: `${URL}/course/instructor/create`,
    listCourses: `${URL}/course/instructor/list`,
    deleteCourses: (ID) => `${URL}/course/instructor/delete/${ID}`,
    modifyCourse: (ID) => `${URL}/course/instructor/modify/${ID}`,
  },
};

const tokenAccess = () => {
  return localStorage.getItem("token_access");
};

const tokenRefresh = () => {
  return localStorage.getItem("token_refresh");
};

export { endpoints, tokenAccess, tokenRefresh };
