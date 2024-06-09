import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import {
  addCoursesFavorites,
  deleteCourseFav,
  listCoursesFavorites,
} from "../Services/Course";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function CourseCard({
  componet,
  courseId,
  name,
  teacher,
  creationDate,
  description,
  onCourseDeleted,
}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const formattedDate = new Date(creationDate).toLocaleDateString();

  const Toast1 = Swal.mixin({
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
  const Toast2 = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast2",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const id_user = parseInt(localStorage.getItem("user_id"));

  const addFavorites = async () => {
    const coursesFav = await listCoursesFavorites();
    const existsCourse = coursesFav.some(
      (course) => course.course === courseId
    );
    if (existsCourse) {
      Toast2.fire({
        icon: "warning",
        title: "El curso ya existe en favoritos",
      });
    } else {
      const body = {
        active: true,
        student: id_user,
        course: courseId,
      };
      await addCoursesFavorites(body);
      Toast1.fire({
        icon: "success",
        title: t("courses.successText"),
      });
    }
  };

  const handleDelete = async (courseId) => {
    const data = {
      active: true,
      student: id_user,
      course: courseId,
    };
    try {
      await Swal.fire({
        title: t("courses.deleteCoursePrompt"),
        text: t("courses.deleteCourseConfirmation"),
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("courses.confirmButton"),
        cancelButtonText: t("courses.cancelButton"),
        preConfirm: async () => {
          await deleteCourseFav(data);
          Swal.fire({
            icon: "success",
            title: t("courses.successTitle"),
            text: t("courses.successText"),
            confirmButtonText: t("courses.continueButton"),
          });
          onCourseDeleted();
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Error al eliminar el curso",
        confirmButtonText: "Continuar",
      });
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="course-container-scroll-teacher">
        <div className="course-container-teacher">
          <div className="course-card-teacher">
            <div className="card-body-teacher">
              {componet === "favs" ? (
                <div className="container-delete">
                  <button
                    className="button-delete-course"
                    onClick={() => handleDelete(courseId)}
                  >
                    <RiDeleteBin6Line className="icon-delete" />
                  </button>
                </div>
              ) : (
                <div className="container-add-fav">
                  <button className="button-add-fav" onClick={addFavorites}>
                    <IoIosStarOutline className="icon-add-fav" />
                  </button>
                </div>
              )}
              <div onClick={openModal}>
                <label className="card-title-teacher">
                  <h2 className="title-teacher">{t("courses.courseName")}:</h2>
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
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              {t("courses.courseCreationDate")}: {formattedDate}
            </p>
            <p>
              {t("courses.courseDescription")}: {description}
            </p>
            <br />
            <Link to={`/Student/${courseId}/Tutor`} className="ask-btn">
              {t("student.buttonconfirmation")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseCard;
