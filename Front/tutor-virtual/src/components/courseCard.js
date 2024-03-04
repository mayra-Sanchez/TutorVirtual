import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../Components/courseCard.css";
import { Link } from "react-router-dom";

const CourseCard = ({ name, teacher, creationDate, description }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card" onClick={openModal}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{teacher}</h6>
          <p className="card-text">Creado: {creationDate}</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <AiOutlineClose />
            </button>
            <h2>{name}</h2>
            <h3>{teacher}</h3>
            <p>Creado: {creationDate}</p>
            <p>{description}</p>
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
