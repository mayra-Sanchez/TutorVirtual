import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./Home/Index";
import Student from "./Student/Index";
import Professor from "./ListCoursesProfessor/Index";
import Create from "./Professor/Index";
import ChatStudent from "./Student/ChatStudent/Index";
import Register from "./Register/Index";
import { Login } from "./Login/Index";
import { useEffect } from "react";
import { refreshToken } from "./Services/token";
import { LoginContext } from "./Components/Context/LoginContext";

function AppRouter() {
  const { login } = useContext(LoginContext);

  useEffect(() => {
    let intervalId;

    if (login) {
      intervalId = setInterval(() => {
        refreshToken().then((response) => {
          localStorage.setItem("token_access", response.access);
          localStorage.setItem("token_refresh", response.refresh);
        });
      }, 30000);
    }

    return () => clearInterval(intervalId);
  }, [login]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Professor" element={<Professor />} />
        <Route path="/Professor/create" element={<Create />} />
        <Route
          path="/Student/:selectedCourseId/Tutor"
          element={<ChatStudent />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
