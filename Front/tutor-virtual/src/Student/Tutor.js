import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";
import { useTranslation } from "react-i18next";

function Tutor() {
  const { t, i18n } = useTranslation();

  const getImageForRoleAndLanguage = () => {
    const language = i18n.language;
    const roleImages = {
      student: {
        en: require("../Resources/student/ingles.png"),
        fr: require("../Resources/student/frances.png"),
        es: require("../Resources/student/español.png"),
        de: require("../Resources/student/aleman.png"),
        md: require("../Resources/student/mandarin.png"),
        hd: require("../Resources/student/hindi.png"),
        pt: require("../Resources/student/portugues.png"),
        rs: require("../Resources/student/ruso.png"),
      }
    };

    return roleImages.student[language] || require("../Resources/student/español.png")
  };

  return (
    <>
      <Navbar href={"/Student/Tutor"} image={getImageForRoleAndLanguage()} role={"users"} />
      <div className="titleStudent">
        <h2>{t("student.courses")}</h2>
      </div>
    </>
  );
}

export default Tutor;
