import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { modifyCourseProfessor } from "../Services/Course";
import "./EditCourseModal.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function EditCourseModal({ course, closeModal }) {
  const { t } = useTranslation();
  const [editedCourse, setEditedCourse] = useState({
    name: course.name,
    description: course.description,
    context: course.context,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyCourseProfessor(course.id, editedCourse);
      Swal.fire({
        icon: 'success',
        title: t('professor.successTitle'),
        text: t('professor.successText'),
      }).then(() => {
        navigate("/Professor");
      });
      closeModal();
    } catch (error) {
      setError(t('professor.errorText'));
      console.error("Error updating course:", error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  useEffect(() => {
    document.body.classList.add("dialog-open");
    return () => {
      document.body.classList.remove("dialog-open");
    };
  }, []);

  return (
    <div className="modal-overlay-course">
      <div className="modal-course">
        <button className="close-btn" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <div className="modal-header">
          <label className="modal-title-course">
            {t('professor.courseCreationTitle2')} <br />
          </label>
          <label className="modal-subtitle-course">{editedCourse.name}</label>
        </div>
        <form onSubmit={handleSubmit} className="modal-container">
          <div className="inputs-container-modal">
            {error && <div className="error-message">{error}</div>}
            <div className="form-control-modal">
              <label htmlFor="name" className="label-modal">
                {t('professor.courseNameLabel')}
              </label>
              <input
                id="name"
                name="name"
                className="input-moda-name"
                type="text"
                placeholder={t('professor.courseNamePlaceholder')}
                onChange={handleChange}
                value={editedCourse.name}
                required
              />
            </div>
            <div className="form-control-modal">
              <label htmlFor="description" className="label-modal">
                {t('professor.courseDescriptionLabel')}
              </label>
              <textarea
                id="description"
                name="description"
                className="input-modal"
                placeholder={t('professor.courseDescriptionPlaceholder')}
                onChange={handleChange}
                value={editedCourse.description}
                required
              />
            </div>
            <div className="form-control-modal long-input">
              <label htmlFor="context" className="label-modal">
                {t('professor.courseContextLabel2')}
              </label>
              <textarea
                id="context"
                name="context"
                className="input-modal"
                placeholder={t('professor.courseContextPlaceholder')}
                onChange={handleChange}
                value={editedCourse.context}
                required
              />
            </div>
          </div>
          <div className="button-container-modal">
            <button className="button-modal" type="submit">
              {t('professor.registerButton2')}
            </button>
            <button
              className="button-modal cancel-button"
              type="button"
              onClick={handleCancel}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseModal;
