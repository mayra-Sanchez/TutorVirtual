import React, { useState } from "react";
import "./Register.css";
import imagen from "../Resources/LogoAPP (2).png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Services/Users";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [role, setRole] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    rol: role,
  });

  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setFormData({ ...formData, rol: event.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
    };

    console.log(data);

    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a registrarte como un nuevo usuario",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Confirmar`,
      allowOutsideClick: false,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          createUser(data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Te has registrado correctamente",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                navigate("/Login");
              });
            })
            .catch((err) => {
              console.error("Error creating user:", err.response.data); // Log the detailed error response
              onError(err.response.data);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: error || "Ocurrió un error al crear el usuario, intenta de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
  };

  return (
    <div className="register-container">
      <div className="icon-container">
        <img src={imagen} alt="Logo" className="Logo-app" />
      </div>
      <div className="card-container">
        <div className="card">
          <div className="title-form-register">
            <label className="title-register">Registro</label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs-container-register">
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="first_name"
                    name="first_name"
                    className="input-gmail-register"
                    type="text"
                    placeholder="Nombre *"
                    onChange={handleChange}
                    required
                  />
                  <small>Por favor ingresa tu nombre</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="last_name"
                    name="last_name"
                    className="input-gmail-register"
                    type="text"
                    placeholder="Apellido *"
                    onChange={handleChange}
                    required
                  />
                  <small>Por favor ingresa tu apellido</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="email"
                    name="email"
                    className="input-gmail-register"
                    type="email"
                    placeholder="Correo electrónico *"
                    onChange={handleChange}
                    required
                  />
                  <small>Por favor ingresa tu correo electrónico</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="password"
                    name="password"
                    className="input-password-register"
                    type={isVisible ? "text" : "password"}
                    placeholder="Contraseña *"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePassword}
                  >
                    {isVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <small>Por favor ingresa tu contraseña</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <select
                    id="rol"
                    name="rol"
                    className="input-gmail-register"
                    value={role}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor">Profesor</option>
                  </select>
                  <small>Por favor seleccione su rol</small>
                </div>
              </div>
            </div>
            <div className="button-container-register">
              <button className="buttonregister" type="submit">
                Crear cuenta
              </button>
              <p>
                ¿Ya tienes cuenta? <a href="/Login">Iniciar sesión</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
