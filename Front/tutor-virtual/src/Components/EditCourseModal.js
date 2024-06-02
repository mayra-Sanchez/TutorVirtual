import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { modifyCourseProfessor } from "../Services/Course";

function EditCourseModal({ course, closeModal }) {
  const [editedCourse, setEditedCourse] = useState({
    name: course.name,
    description: course.description,
    context: course.context,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyCourseProfessor(course.id, editedCourse);
      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Dialog
      visible={true} // Aquí deberías usar una prop para controlar la visibilidad del modal, como `visible`
      style={{ width: "50vw", background: "white" }}
      onHide={closeModal} // Aquí deberías usar la función para cerrar el modal
    >
      <div className="modal-header">
        <label className="modal-title">Editar Curso</label>
      </div>
      <form onSubmit={handleSubmit} className="modal-container">
        <div className="inputs-container-modal">
          <div className="form-control-modal">
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
          <div className="form-control-modal">
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
        </div>
      </form>
    </Dialog>
  );
}

export default EditCourseModal;