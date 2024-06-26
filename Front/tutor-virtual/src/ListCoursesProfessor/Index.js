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
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import EditCourseModal from "../Components/EditCourseModal";
import { useTranslation } from "react-i18next";

function ListCoursesProfessor() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await listCoursesProfessor();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const changeRoute = () => {
    navigate("/Professor/create");
  };

  const handleDate = (date) => {
    const courseCreationDate = new Date(date);

    const day = courseCreationDate.getDate();
    const month = courseCreationDate.getMonth() + 1;
    const year = courseCreationDate.getFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;

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
          deleteCourseProfessor(idCourse, data)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: t("courses.successTitle"),
                text: t("courses.successText"),
                confirmButtonText: t("courses.continueButton"),
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
      title: t("courses.errorTitle"),
      text: error || t("courses.errorText"),
      confirmButtonText: t("courses.continueButton"),
      allowOutsideClick: false,
      showCancelButton: false,
    });
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
    fetchData();
  };

  const getImageForRoleAndLanguage = () => {
    const language = i18n.language;
    const roleImages = {
      professor: {
        en: require("../Resources/professor/Ingles.png"),
        fr: require("../Resources/professor/Frances.png"),
        es: require("../Resources/professor/español.png"),
        de: require("../Resources/professor/Aleman.png"),
        md: require("../Resources/professor/mandarin.png"),
        hd: require("../Resources/professor/hindi.png"),
        pt: require("../Resources/professor/portugues.png"),
        rs: require("../Resources/professor/ruso.png"),
      }
    };

    return roleImages.professor[language] || require("../Resources/student/español.png")
  };

  return (
    <>
      <Navbar href={"/Professor"} image={getImageForRoleAndLanguage()} role={"professor"} />
      <div className="titleStudent">
        <h2>{t("courses.title")}</h2>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loader">
            <div className="scanner">
              <span>{t("courses.loading")}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="course-container-scroll-teacher">
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
                      <button
                        className="button-edit-course"
                        onClick={() => openEditModal(course)}
                      >
                        <RiEditBoxLine className="icon-edit" />
                      </button>
                    </div>
                    <label className="card-title-teacher">
                      <h2 className="title-teacher">
                        {t("courses.courseName")}:
                      </h2>{" "}
                      {course.name}
                    </label>
                    <div className="card-text-teacher">
                      <h2 className="title-teacher">
                        {t("courses.courseDescription")}:
                      </h2>{" "}
                      {course.description}
                    </div>
                    <div className="card-text-teacher">
                      <h2 className="title-teacher">
                        {t("courses.courseCreationDate")}:
                      </h2>{" "}
                      {handleDate(course.creation_date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="add-new-course-container">
            <button
              type="submit"
              className="button-add-course"
              onClick={changeRoute}
            >
              +
            </button>
          </div>
          {isModalOpen && (
            <EditCourseModal
              course={selectedCourse}
              closeModal={closeEditModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default ListCoursesProfessor;
