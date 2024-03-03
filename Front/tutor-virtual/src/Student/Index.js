import React from "react";
import Navbar from "../Components/Navbar";
import Image from "../Resources/SS.png";
import "./Student.css";

function Student() {
  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="container"></div>
    </>
  );
}

export default Student;
