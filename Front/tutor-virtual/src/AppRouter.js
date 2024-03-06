import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";
import Student from "./Student/Index";
import Professor from "./Professor/Index";
import ChatStudent from "./Student/ChatStudent/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Professor" element={<Professor />} />
        <Route path="/Student/Tutor" element={<ChatStudent />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
