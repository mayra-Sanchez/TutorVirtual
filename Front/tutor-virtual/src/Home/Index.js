import React from "react";
import Image from "../Resources/title.png";
import Navbar from "../Components/Navbar";
import "../index.css";

function Home() {
  return (
    <div className="App">
      <Navbar href={"/"} image={Image} role={"home"} />
      <div className="grid text-center"></div>
    </div>
  );
}

export default Home;
