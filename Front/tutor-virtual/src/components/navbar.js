import React from "react";
import "./Navbar.css";

function Navbar({ image, role, href }) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <ul className="navbarListado d-flex">
          <a href="/">
            <img src={image} alt="Logo" height="110" width="120" />
          </a>
          {role === "users" ? (
            <li className="navbarItems">
              <a href={href} className="navbar-home">
                Mis cursos
              </a>
            </li>
          ) : (
            <li className="navbarItems">
              <a href="/" className="navbar-home">
                Inicio
              </a>
              <span style={{ marginRight: "30px" }}></span>
              <a href="/SobreNosotros" className="navbar-home">
                Acerca de nosotros
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
