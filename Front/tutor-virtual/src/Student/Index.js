import React from "react";
import Navbar from "../components/navbar.js"
import Image from "../resources/Student.png";
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
