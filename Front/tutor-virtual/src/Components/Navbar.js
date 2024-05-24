import React, { useState } from "react";
import "./Navbar.css";
import settingsIcon from './settings-icon.svg';
import ModalEdit from "./ModalEdit";
// Navbar
function Navbar({ image, role, href }) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
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
                <img 
                  src={settingsIcon} 
                  alt="Settings" 
                  className="settingsIcon" 
                  onClick={showDialog} 
                  style={{ marginLeft: '20px', cursor: 'pointer' }}
                />
              </li>
            ) : (
              <li className="navbarItems d-flex align-items-center">
                <a href="/Login" className="navbar-home">
                  Iniciar sesión
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ModalEdit visible={visible} onHide={hideDialog} />
    </>
  );
}

export default Navbar;