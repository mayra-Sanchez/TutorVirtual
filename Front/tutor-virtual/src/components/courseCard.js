import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import { listCourses } from "../Services/Course";

const CourseCard = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {course && (
        <div className="card" onClick={openModal}>
          <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{course.instructor_name}</h6>
            <p className="card-text">Creado: {course.creation_date}</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <AiOutlineClose />
            </button>
            <h2>{course.name}</h2>
            <h3>{course.instructor_name}</h3>
            <p>Creado: {course.creation_date}</p>
            <p>{course.description}</p>
            <Link to="/Tutor" className="ask-btn">
              Preguntale al tutor
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
