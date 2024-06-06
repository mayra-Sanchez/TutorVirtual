import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import {
  addCoursesFavorites,
  deleteCourseFav,
  listCourses,
  listCoursesFavorites,
} from "../Services/Course";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

//Component courses
const CourseCard = ({
  componet,
  courseId,
  name,
  teacher,
  creationDate,
  description,
}) => {
  // const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    fetchCourse();
    // fetchCourseFavs();
  }, []);

  const fetchCourse = async () => {
    try {
      await listCourses();
      // const courses = await listCourses();
      // const selectedCourse = courses.find((c) => c.id === courseId);
      // setCourse(selectedCourse);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // const fetchCourseFavs = async () => {
  //   try {
  //     await listCoursesFavorites();
  //     const selectedCourse = coursesFav.find((c) => c.id === courseId);
  //     setCourse(selectedCourse);
  //   } catch (error) {
  //     console.log("error fetching fav course", error)
  //   }
  // }

  const openModal = () => {
    setShowModal(true);
    setSelectedCourseId(courseId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourseId(null);
  };

  var creation_date = creationDate;
  var dateObj = new Date(creation_date);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();
  var date =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    year;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const addFavorites = async () => {
    // const coursesFav = await listCoursesFavorites();
    // const exitsCourse = coursesFav.some((curso) => curso.id === courseId);
    // if (exitsCourse) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "El curso ya existe en favoritos",
    //   });
    // } else {
    //   const body = {
    //     id: courseId,
    //     name: name,
    //   };
    //   addCoursesFavorites(body).then(() => {
    //     Toast.fire({
    //       icon: "success",
    //       title: "Curso añadido a favoritos",
    //     });
    //   });
    // }

    Toast.fire({
      icon: "success",
      title: "Curso añadido a favoritos",
    });
  };

  const handleDelete = (idCourse) => {
    Swal.fire({
      title: "¿Estás seguro de hacer esto?",
      text: "Vas a elimar el curso de favoritos",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      allowOutsideClick: false,
      cancelButtonText: "No, cancelar",

      preConfirm: () => {
        return new Promise((resolve, reject) => {
          deleteCourseFav(idCourse)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Curso eliminado exitosamente",
                // text: "",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                // fetchData();
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
      title: "Error",
      text: error || "Error al eliminar el curso",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
  };
  return (
    <>
      {componet === "favs" && (
        <div className="course-container-scroll-teacher">
          <div className="course-container-teacher">
            <div className="course-card-teacher">
              <div className="card-body-teacher">
                <div className="container-delete">
                  <button
                    className="button-delete-course"
                    // onClick={() =>
                    //   handleDelete(
                    //     courseId
                    //   )
                    // }
                  >
                    <RiDeleteBin6Line className="icon-delete" />
                  </button>
                </div>
                <div onClick={openModal}>
                  <label className="card-title-teacher">
                    <h2 className="title-teacher">Nombre del curso:</h2> {name}
                  </label>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Profesor:</h2> {description}
                  </div>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Descripción:</h2>{" "}
                    {description}
                  </div>

                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Fecha de creación:</h2> {date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!componet && (
        <div className="course-container-scroll-teacher">
          <div className="course-container-teacher">
            <div className="course-card-teacher">
              <div className="card-body-teacher">
                <div className="container-add-fav">
                  <button className="button-add-fav" onClick={addFavorites}>
                    <IoIosStarOutline className="icon-add-fav" />
                  </button>
                </div>
                <div className="card-body-student-courses" onClick={openModal}>
                  <label className="card-title-teacher">
                    <h2 className="title-teacher">Nombre del curso:</h2> {name}
                  </label>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Profesor:</h2> {teacher}
                  </div>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Descripción:</h2>{" "}
                    {description}
                  </div>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">Fecha de creación:</h2> {date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <AiOutlineClose />
            </button>
            <h2>Nomre del curso: {name}</h2>
            <h3>Nombre del profesor: {teacher}</h3>
            <p>Fecha de creación: {date}</p>
            <p>Descripción: {description}</p>
            <br></br>
            <Link to={`/Student/${selectedCourseId}/Tutor`} className="ask-btn">
              Preguntale al tutor
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
