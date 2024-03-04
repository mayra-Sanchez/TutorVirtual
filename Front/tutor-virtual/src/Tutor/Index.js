import React from "react";
import Navbar from "../Components/Navbar";
import Image from "../Resources/Student.png";

function Tutor() {
  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="container"></div>
    </>
  );
}

export default Tutor;
