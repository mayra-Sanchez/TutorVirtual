import React, { useState } from "react";
import "./Register.css";
import imagen from "../Resources/LogoAPP (2).png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createUser } from "../Services/Users";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();
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
      title: t("register.confirmationTitle"),
      text: t("register.registerText"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: t("register.confirmButtonText"),
      allowOutsideClick: false,
      cancelButtonText: t("register.cancelButtonText"),
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          createUser(data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: t("register.successTitle"),
                text: t("register.successText"),
                confirmButtonText: t("register.continueButtonText"),
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
      title: t("register.errorTitle"),
      text: error || t("register.errorText"),
      confirmButtonText: t("register.continueButtonText"),
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
            <label className="title-register">{t("register.registerTitle")}</label>
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
                    placeholder={t("register.firstNamePlaceholder")}
                    onChange={handleChange}
                    required
                  />
                  <small>{t("register.firstNameLabel")}</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="last_name"
                    name="last_name"
                    className="input-gmail-register"
                    type="text"
                    placeholder={t("register.lastNamePlaceholder")}
                    onChange={handleChange}
                    required
                  />
                  <small>{t("register.lastNameLabel")}</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="email"
                    name="email"
                    className="input-gmail-register"
                    type="email"
                    placeholder={t("register.emailPlaceholder")}
                    onChange={handleChange}
                    required
                  />
                  <small>{t("register.emailLabel")}</small>
                </div>
              </div>
              <div className="input-with-icon-register">
                <div className="form-control-register">
                  <input
                    id="password"
                    name="password"
                    className="input-password-register"
                    type={isVisible ? "text" : "password"}
                    placeholder={t("register.passwordPlaceholder")}
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
                  <small>{t("register.passwordLabel")}</small>
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
                    <option value="">{t("register.selectRolePlaceholder")}</option>
                    <option value="Estudiante">{t("register.studentOption")}</option>
                    <option value="Profesor">{t("register.teacherOption")}</option>
                  </select>
                  <small>{t("register.selectRoleLabel")}</small>
                </div>
              </div>
            </div>
            <div className="button-container-register">
              <button className="buttonregister" type="submit">
                {t("register.createAccountButton")}
              </button>
              <p>
                {t("register.haveAccountQuestion")} <a href="/Login">{t("register.loginLink")}</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
