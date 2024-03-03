import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Professor.png";
import "./Professor.css";

function Professor() {
  return (
    <>
      <Navbar href={"/Professor"} image={Image} role={"users"} />
      <div className="container">
        <h1 className="title">Creación del curso</h1>
        <div className="forms-container">
          <form className="form1">
            <h2 className="title2">Registro</h2>
            <div className="input-group">
              <span className="spanName">
                Nombre del curso: <span className="redStar"> *</span>
              </span>
              <input type="text" className="form-control" required />
            </div>
            <div className="input-group">
              <span className="spanName">
                Nombre del instructor: <span className="redStar"> *</span>
              </span>
              <input type="text" className="form-control" required />
            </div>
            <div className="input-group">
              <span className="spanName">
                Descripcion del curso: <span className="redStar"> *</span>
              </span>
              <textarea
                rows="7"
                type="text"
                className="form-control"
                required
              />
            </div>
          </form>
          <div className="container2">
            <form className="form2">
              <div className="input-group">
                <span className="spanName">
                  Escribele al tutor virtual que temas se verán en el curso:{" "}
                  <span className="redStar"> *</span>
                </span>
                <textarea
                  rows="10"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
            </form>
            <button type="submit" className="buttonRegister">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Professor;
