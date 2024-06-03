import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { logout } from "../Services/Users";
import ModalEdit from "./ModalEdit";
import "./Navbar.css";
import settingsIcon from "./settings-icon.svg";
import { LoginContext } from "../Components/Context/LoginContext";
import { useTranslation } from "react-i18next";

function Navbar({ image, role, href }) {
  const { setLogin } = useContext(LoginContext);
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("token_refresh");
    const requestBody = { refresh: refreshToken };
    Swal.fire({
      title: t("navbar.confirmationTitle"),
      text: t("navbar.logoutText"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: t("navbar.confirmButtonText"),
      allowOutsideClick: false,
      cancelButtonText: t("navbar.cancelButtonText"),
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
                title: t("navbar.successTitle"),
                text: t("navbar.logoutSuccessText"),
                confirmButtonText: t("navbar.continueButtonText"),
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
      title: t("navbar.errorTitle"),
      text: t("navbar.logoutErrorText"),
      confirmButtonText: t("navbar.continueButtonText"),
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FFFFFF", width: "100%" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <ul className="navbarListado d-flex">
            <a href="/">
              <img src={image} alt="Logo" className="imageNav" />
            </a>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={i18n.language}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="md">普通话</option>
              <option value="hd">हिन्दी</option>
              <option value="pt">Portugués</option>
              <option value="rs">Pусский</option>
            </select>
            {role === "users" ? (
              <li className="navbarItems">
                <a href={href} className="navbar-home">
                  {t("navbar.courses")}
                </a>
                <img
                  src={settingsIcon}
                  alt="Settings"
                  className="settingsIcon"
                  onClick={showDialog}
                  style={{
                    marginLeft: "20px",
                    marginRight: "40px",
                    cursor: "pointer",
                  }}
                />
                <a
                  href="javascript:void(0)"
                  onClick={handleLogout}
                  className="navbar-home"
                >
                  {t("navbar.logout")}
                </a>
              </li>
            ) : (
              <li className="navbarItems d-flex align-items-center">
                <a href="/Login" className="navbar-home">
                  {t("navbar.login")}
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
