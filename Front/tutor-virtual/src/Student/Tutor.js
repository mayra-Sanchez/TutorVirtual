import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";
import { useTranslation } from "react-i18next";

function Tutor() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar href={"/Student/Tutor"} image={Image} role={"users"} />
      <div className="titleStudent">
        <h2>{t("student.courses")}</h2>
      </div>
    </>
  );
}

export default Tutor;
