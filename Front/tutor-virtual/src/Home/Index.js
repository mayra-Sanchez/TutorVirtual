import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Image from "../Resources/title.png";
import Image2 from "../Resources/6.png";
import Navbar from "../Components/Navbar";
import "../Home/Home.css";

//Funcion principal
function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <Navbar href={"/"} image={Image} role={"home"} />
      <div id="AboutUs" name="AboutUs" className="title"></div>
      <div className="about-us-container">
        <div className="about-us-content">
          <h2>¿Eres estudiante o profesor?</h2>
          <p>
            Tutor virtual ofrece una experiencia versátil tanto para profesores
            como para estudiantes.
          </p>
          <p>
            Si eres profesor, puedes utilizar nuestra plataforma para crear
            cursos, proporcionando a tus alumnos una experiencia de aprendizaje
            enriquecedora. Si eres estudiante, nuestra aplicación te permite
            acceder a una amplia gama de cursos y hacer preguntas relacionadas
            con el contenido de estos.
          </p>
        </div>
        <img src={Image2} alt="Imagen 2" className="about-us-image" />
      </div>
      <div className="container">
        <h3 style={{ color: "white", fontWeight: "bold" }}>
          {" "}
          ¡Desbloquea tu potencial y alcanza tus metas educativas de manera
          inteligente y eficiente!
        </h3>
      </div>
      <div className="falseSpace"></div>
      {/* <div id="Home" name="Home" className="title">
        <div className="container">
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            ¿Cómo deseas continuar?
          </h2>
        </div>
        <div className="button-container">
          <Link to="/Professor" className="button">
            Profesor
          </Link>
          <Link to="/Student" className="button">
            Estudiante
          </Link>
        </div>
      </div>
      {showScrollButton && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )} */}
    </div>
  );
}

export default Home;
