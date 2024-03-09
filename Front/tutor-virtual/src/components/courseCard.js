import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import { listCourses } from "../Services/Course";

//Component courses
const CourseCard = ({ courseId, name, teacher, creationDate, description }) => {
  const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await listCourses();
        const selectedCourse = courses.find((c) => c.id === courseId);
        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

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

  return (
    <>
      {course && (
        <div className="card" onClick={openModal}>
          <div className="card-body">
            <h5 className="card-title">
              <h10>Nombre del curso:</h10> {name}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Profesor: {teacher}
            </h6>
            <p className="card-text">
              <h10>Creado:</h10> {date}
            </p>
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
            <h3>Profesor: {teacher}</h3>
            <p>Creado: {date}</p>
            <p>Descripción: {description}</p>
            <br></br>
            <Link
              to={`/Student/${selectedCourseId}/Tutor`}
              className="ask-btn"
            >
              Preguntale al tutor
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;