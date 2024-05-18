import React from "react";
import "./Navbar.css";

//Navbar
function Navbar({ image, role, href }) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#FFFFFF", width: "100%" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <ul className="navbarListado d-flex">
          <a href="/">
            <img src={image} alt="Logo" className="imageNav" />
          </a>
          {role === "users" ? (
            <li className="navbarItems">
              <a href={href} className="navbar-home">
                Cursos
              </a>
            </li>
          ) : (
            <li className="navbarItems">
              <a href="/Login" className="navbar-home">
                Iniciar sesión
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
