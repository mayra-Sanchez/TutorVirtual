import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Image from "../Resources/Professor.png";
import { listCoursesProfessor } from "../Services/Course";
import Navbar from "../Components/Navbar";
import "./ListCoursesProfessor.css";

function ListCoursesProfessor() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoanding] = useState(true);

  useEffect(() => {
    setLoanding(true);
    const fetchData = async () => {
      try {
        const data = await listCoursesProfessor();
        setCourses(data);
        setLoanding(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const changeRoute = () => {
    navigate("/Professor/create");
  };

  const handleDate = (date) => {
    const courseCreationDate = new Date(date);

    // Obtenemos los valores del día, mes y año
    const day = courseCreationDate.getDate();
    const month = courseCreationDate.getMonth() + 1;
    const year = courseCreationDate.getFullYear();

    const formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      year;

    return formattedDate;
  };

  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="titleStudent">
        <h2>Cursos</h2>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loader">
            <div className="scanner">
              <span>Cargando...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="course-container-scroll">
            <div className="course-container-teacher">
              {courses.map((course) => (
                <div key={course.id} className="course-card-teacher">
                  <div className="card-body-teacher">
                    <label className="card-title-teacher">
                      <h2 className="title-teacher">Nombre del curso:</h2>{" "}
                      {course.name}
                    </label>
                    <div className="card-text-teacher">
                      <h2 className="title-teacher">Descripción:</h2>{" "}
                      {course.description}
                    </div>
                    <div className="card-text-teacher">
                      <h2 className="title-teacher">Fecha de creación:</h2>{" "}
                      {handleDate(course.creation_date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="buttonRegister"
              onClick={changeRoute}
            >
              +
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ListCoursesProfessor;
