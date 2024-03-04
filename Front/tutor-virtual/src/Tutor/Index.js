import React from "react";
import Navbar from "../components/navbar.js";
import Image from "../resources/title.png";

function Tutor() {
  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="container"></div>
    </>
  );
}

export default Tutor;
