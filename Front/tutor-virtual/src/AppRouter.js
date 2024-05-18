import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";
import Student from "./Student/Index";
import Professor from "./Professor/Index";
import ChatStudent from "./Student/ChatStudent/Index";
import Register from "./Register/Index";
import { Login } from "./Login/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Professor" element={<Professor />} />
        <Route
          path="/Student/:selectedCourseId/Tutor"
          element={<ChatStudent />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
