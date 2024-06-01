import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Image from "../Resources/Professor.png";
import {
  deleteCourseProfessor,
  listCoursesProfessor,
} from "../Services/Course";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";
import "./ListCoursesProfessor.css";
import { RiDeleteBin6Line } from "react-icons/ri";

function ListCoursesProfessor() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoanding] = useState(true);

  useEffect(() => {
    setLoanding(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await listCoursesProfessor();
      setCourses(data);
      setLoanding(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

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

  const handleDelete = (idCourse, name, description, context) => {
    const idUser = localStorage.getItem("user_id");
    const data = {
      idCourse: idCourse,
      name: name,
      description: description,
      context: context,
      instructor: idUser,
    };
    console.log("EL ID DEL PRODUCTO", idCourse);
    const ID = idCourse;
    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a eliminar un curso",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Si, eliminar`,
      allowOutsideClick: false,
      cancelButtonText: "No, cancelar",

      preConfirm: () => {
        return new Promise((resolve, reject) => {
          console.log("EL ID QUE PASO ACÁ", ID);
          console.log("la data que se va a mandar", data);
          deleteCourseProfessor(ID, data)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "El curso fue eliminado correctamente",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                fetchData();
              });
            })
            .catch((err) => {
              onError(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: error || "Ocurrió un error al crear el usuario, intenta de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
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
                    <div className="container-delete">
                      <button
                        className="button-delete-course"
                        onClick={() =>
                          handleDelete(
                            course.id,
                            course.name,
                            course.description,
                            course.context
                          )
                        }
                      >
                        <RiDeleteBin6Line className="icon-delete" />
                      </button>
                    </div>
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
