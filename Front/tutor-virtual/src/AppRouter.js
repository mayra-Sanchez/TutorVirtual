import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";
import Student from "./Student/Index";
import Professor from "./Professor/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Professor" element={<Professor />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
