import React from "react";
import "../index.css";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/title.svg";

function Home() {
  return (
    <div className="App">
      <Navbar href={"/"} image={Image} role={"home"} />
      <div className="grid text-center"></div>
    </div>
  );
}

export default Home;
