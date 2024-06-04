import Navbar from "../../Components/Navbar";
import Image from "../../Resources/Student.png";
import "./FavCoursesList.css";
function FavCoursesList() {
  return <Navbar href={"/Student"} image={Image} role={"student"} />;
}

export default FavCoursesList;
