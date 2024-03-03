import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Professor.svg";

function Professor() {
  return (
    <>
      <Navbar href={"/Professor"} image={Image} role={"users"} />
      <div className="container"></div>
    </>
  );
}

export default Professor;
