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

  const { t } = useTranslation();

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
    //       title: t("courses.successTitle"),
    //       text: t("courses.successText"),
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
      title: t("courses.deleteCoursePrompt"),
      text: t("courses.deleteCourseConfirmation"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: t("courses.confirmButton"),
      allowOutsideClick: false,
      cancelButtonText: t("courses.cancelButton"),
     
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          deleteCourseFav(idCourse)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: t("courses.successTitle"),
                text: t("courses.successText"),
                confirmButtonText: t("courses.continueButton"),
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
                    // onClick={() => handleDelete(courseId)}
                  >
                    <RiDeleteBin6Line className="icon-delete" />
                  </button>
                </div>
                <div onClick={openModal}>
                  <label className="card-title-teacher">
                    <h2 className="title-teacher">
                      {t("courses.courseName")}:
                    </h2> 
                    {name}
                  </label>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">
                      {t("courses.courseDescription")}:
                    </h2> 
                    {description}
                  </div>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">
                      {t("courses.courseCreationDate")}:
                    </h2> 
                    {date}
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
                    <h2 className="title-teacher">
                      {t("courses.courseName")}:
                    </h2> 
                    {name}
                  </label>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">
                      {t("courses.courseDescription")}:
                    </h2> 
                    {description}
                  </div>
                  <div className="card-text-teacher">
                    <h2 className="title-teacher">
                      {t("courses.courseCreationDate")}:
                    </h2> 
                    {date}
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
            <h2>
              {t("courses.courseName")}: {name}
            </h2>
            <h3>
              {t("courses.courseDescription")}: {teacher}
            </h3>
            <p>
              {t("courses.courseCreationDate")}: {date}
            </p>
            <p>
              {t("courses.courseDescription")}: {description}
            </p>
            <br />
            <Link to={`/Student/${selectedCourseId}/Tutor`} className="ask-btn">
              {t("student.buttonconfirmation")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;