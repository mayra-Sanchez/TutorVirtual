import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/home";
import AboutUs from "./Home/sobreNosotros";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="SobreNosotros" element={<AboutUs />} />
                <Route path="/" element={<Home />} />
                <Route path="Home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;