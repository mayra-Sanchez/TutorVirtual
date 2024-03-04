import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";

function Tutor() {

  return (
    <>
      <Navbar href={"/Student/Tutor"} image={Image} role={"users"} />
      <div className="titleStudent">
        <h2>Cursos</h2>
      </div>
      

    </>
  );
}

export default Tutor;
