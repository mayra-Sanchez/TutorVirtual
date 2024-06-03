import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import Swal from "sweetalert2";
import { modifyCourseProfessor } from "../Services/Course";
import "./EditCourseModal.css";
import { useNavigate } from "react-router";

function EditCourseModal({ course, closeModal }) {
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
        title: 'Curso actualizado',
        text: 'El curso ha sido actualizado correctamente.',
      }).then(() => {
        navigate("/Professor");
      });
      closeModal();
    } catch (error) {
      setError("Error al actualizar el curso. Por favor, intenta de nuevo.");
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
    <Dialog
      visible={true}
      style={{ width: "50vw", background: "white", borderRadius: "10px" }}
      onHide={closeModal}
    >
      <div className="modal-header-course">
        <label className="modal-title-course">Editar curso <br/></label>
        <label className="modal-subtitle-course">{editedCourse.name}</label>
      </div>
      <form onSubmit={handleSubmit} className="modal-container-course">
        <div className="inputs-container-modal-course">
          {error && <div className="error-message">{error}</div>}
          <div className="form-control-modal">
            <label htmlFor="name" className="label-modal">Nombre</label>
            <input
              id="name"
              name="name"
              className="input-modal"
              type="text"
              placeholder="Nombre del curso"
              onChange={handleChange}
              value={editedCourse.name}
              required
            />
          </div>
          <div className="form-control-modal">
            <label htmlFor="description" className="label-modal">Descripción</label>
            <textarea
              id="description"
              name="description"
              className="input-modal"
              placeholder="Descripción del curso"
              onChange={handleChange}
              value={editedCourse.description}
              required
            />
          </div>
          <div className="form-control-modal long-input">
            <label htmlFor="context" className="label-modal">Contexto</label>
            <textarea
              id="context"
              name="context"
              className="input-modal"
              placeholder="Contexto del curso"
              onChange={handleChange}
              value={editedCourse.context}
              required
            />
          </div>
        </div>
        <div className="button-container-modal">
          <button className="button-modal" type="submit">
            Guardar cambios
          </button>
          <button className="button-modal cancel-button" type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default EditCourseModal;
