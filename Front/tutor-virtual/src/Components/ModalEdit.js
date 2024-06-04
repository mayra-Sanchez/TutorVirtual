import React, { useState, useEffect } from "react";
import { updateUser, getUserData } from "../Services/Users";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./ModalEdit.css";
import { AiOutlineClose } from "react-icons/ai";

function ModalEdit({ visible, onHide }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (visible) {
      document.body.classList.add("dialog-open");
    } else {
      document.body.classList.remove("dialog-open");
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setFormData({
          first_name: decodedToken.full_name.split(" ")[0],
          last_name: decodedToken.full_name.split(" ")[1],
          email: decodedToken.email,
        });
      }
      const userId = localStorage.getItem("user_id");
      getUserData(userId)
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          Swal.fire({
            icon: "error",
            title: t("modalEdit.errorTitle"),
            text: t("modalEdit.errorText"),
            confirmButtonText: t("modalEdit.continueButtonText"),
          });
        });
    }
  }, [visible, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    updateUser(userId, formData)
      .then(() => {
        onHide();
        Swal.fire({
          icon: "success",
          title: t("modalEdit.successTitle"),
          text: t("modalEdit.successText"),
          confirmButtonText: t("modalEdit.continueButtonTex"),
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        Swal.fire({
          icon: "error",
          title: t("modalEdit.errorTitle"),
          text: t("modalEdit.errorText"),
          confirmButtonText: t("modalEdit.continueButtonText"),
        });
      });
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay-edit-user">
      <div className="modal-edit-user">
        <button className="close-btn" onClick={onHide}>
          <AiOutlineClose />
        </button>
        <div className="modal-header">
          <label className="modal-title">{t("modalEdit.title")}</label>
        </div>
        <form onSubmit={handleSubmit} className="modal-container">
          <div className="inputs-container-modal">
            <div className="input-with-icon-modal">
              <div className="form-control-modal">
                <label htmlFor="first_name" className="label-modal">
                  {t("modalEdit.firstNameLabel")}
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  className="input-moda-name"
                  type="text"
                  placeholder={t("modalEdit.firstNamePlaceholder")}
                  onChange={handleChange}
                  value={formData.first_name}
                  required
                />
              </div>
            </div>
            <div className="input-with-icon-modal">
              <div className="form-control-modal">
                <label htmlFor="last_name" className="label-modal">
                  {t("modalEdit.lastNameLabel")}
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  className="input-moda-name"
                  type="text"
                  placeholder={t("modalEdit.lastNamePlaceholder")}
                  onChange={handleChange}
                  value={formData.last_name}
                  required
                />
              </div>
            </div>
            <div className="input-with-icon-modal">
              <div className="form-control-modal">
                <label htmlFor="email" className="label-modal">
                  {t("modalEdit.emailLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  className="input-moda-name"
                  type="email"
                  placeholder={t("modalEdit.emailPlaceholder")}
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>
          </div>
          <div className="button-container-modal">
            <button className="button-modal" type="submit">
              {t("modalEdit.saveChangesButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEdit;
