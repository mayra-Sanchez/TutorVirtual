import React from "react";
import Navbar from "../components/navbar.js";
import Image from "../resources/Professor.png";

function Professor() {
  return (
    <>
      <Navbar href={"/Professor"} image={Image} role={"users"} />
      <div className="container"></div>
    </>
  );
}

export default Professor;
