import React, { useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Professor.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import { addCourse } from "../Services/Course";
import { useSpeechApi } from "../Components/Hooks/SpeechApi.js";
import activate from "../Resources/microphone.png";
import Swal from "sweetalert2";
import "./Professor.css";
import { useTranslation } from "react-i18next"; // Importa useTranslation

function Professor() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Obtén las funciones de traducción
  const { transcript, isListening, startListening, stopListening } =
    useSpeechApi();
  const user_id = parseInt(localStorage.getItem("user_id"), 10);
  const [courseData, setCourseData] = useState({
    name: "",
    instructor: user_id,
    description: "",
    context: "",
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isListening) {
      setCourseData((prevData) => ({
        ...prevData,
        context: prevData.context + transcript,
      }));
    }
  }, [transcript, isListening]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...courseData,
    };

    Swal.fire({
      title: t("professor.confirmationTitle"), // Usa la función de traducción para las cadenas
      text: t("professor.registerText"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: t("professor.confirmButtonText"),
      allowOutsideClick: false,
      cancelButtonText: t("navbar.cancelButtonText"), // Usa la función de traducción para las cadenas
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          addCourse(data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: t("navbar.successTitle"),
                text: t("professor.successText"),
                confirmButtonText: t("navbar.continueButtonText"),
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                navigate("/Professor");
              });
            })
            .catch((err) => {
              onError(t("professor.errorText")); // Usa la función de traducción para las cadenas
              console.log(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: t("navbar.errorTitle"),
      text: error, // Usa la función de traducción para las cadenas
      confirmButtonText: t("navbar.continueButtonText"),
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("este es el error", error);
  };

  return (
    <>
      <Navbar href={"/Professor"} image={Image} role={"professor"} />
      <div className="container">
        <h1 className="title">{t("professor.courseCreationTitle")}</h1>
        <form className="forms-container" onSubmit={handleSubmit}>
          <div className="form1">
            <h2 className="title2">{t("professor.registerTitle")}</h2>
            <div className="input-group">
              <span className="spanName">
                {t("professor.courseNameLabel")}:{" "}
                <span className="redStar"> *</span>
              </span>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                placeholder={t("professor.courseNamePlaceholder")}
                required
              />
            </div>
            <div className="input-group">
              <span className="spanName">
                {t("professor.courseDescriptionLabel")}:{" "}
                <span className="redStar"> *</span>
              </span>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="description"
                onChange={handleChange}
                placeholder={t("professor.courseDescriptionPlaceholder")}
                required
              />
            </div>
          </div>
          <div className="container2">
            <div className="form2">
              <div className="input-group">
                <span className="spanName">
                  {t("professor.courseContextLabel")}:{" "}
                  <span className="redStar"> *</span>
                </span>
                <textarea
                  rows="14"
                  type="text"
                  className="form-control"
                  name="context"
                  value={courseData.context}
                  onChange={handleChange}
                  disabled={isListening}
                  placeholder={t("professor.courseContextPlaceholder")}
                  required
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className="microfoneButton"
                >
                  {" "}
                  {isListening ? (
                    <div className="ContainerVoice">
                      <div className="visualizador-audio">
                        <div className="linea"></div>
                        <div className="linea"></div>
                        <div className="linea"></div>
                      </div>
                    </div>
                  ) : (
                    <img src={activate} alt="Logo" className="microphone" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="buttonRegister">
              {t("professor.registerButton")} {/* Traduce el texto del botón */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Professor;
