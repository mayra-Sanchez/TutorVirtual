import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { logout } from "../Services/Users";
import ModalEdit from "./ModalEdit";
import "./Navbar.css";
import { useContext } from "react";
import { LoginContext } from "../Components/Context/LoginContext";
import { Menu } from "primereact/menu";
import { IoSettingsOutline } from "react-icons/io5";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Navbar({ image, role, href }) {
  const { setLogin } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("token_refresh");
    const requestBody = {
      refresh: refreshToken,
    };
    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a cerrar sesión",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Si, salir`,
      allowOutsideClick: false,
      cancelButtonText: "No, cancelar",
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          logout(requestBody)
            .then(() => {
              localStorage.removeItem("token_access");
              localStorage.removeItem("token_refresh");
              localStorage.removeItem("user_id");
              setLogin(false);
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Se ha cerrado sesión",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                navigate("/");
              });
            })
            .catch((err) => {
              onError(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ocurrió un error al cerrar sesión",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  const menu = useRef(null);

  const items = [
    {
      label: "Actualizar info",
      icon: "pi pi-refresh",
      command: openModal,
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: handleLogout,
    },
  ];

  const showMenu = (event) => {
    menu.current.toggle(event);
  };

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
                <button onClick={showMenu} className="button-settings">
                  <IoSettingsOutline className="icon-settings" />
                </button>
                <Menu model={items} popup ref={menu} className="custom-menu" />
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
      <ModalEdit visible={showModal} onHide={closeModal} />
    </>
  );
}

export default Navbar;
