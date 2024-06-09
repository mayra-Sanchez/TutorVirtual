import image from "../Resources/LogoAPP (2).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Loading } from "../Components/loading";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../Components/Context/LoginContext";
import { login } from "../Services/Users";
import { useTranslation } from "react-i18next";

function Login() {
  const { setLogin } = useContext(LoginContext);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    login(data)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("token_access", response.access);
        localStorage.setItem("token_refresh", response.refresh);
        const decoded = jwtDecode(response.access);
        localStorage.setItem("user_id", decoded.user_id);
        Swal.fire({
          icon: "success",
          title: t("login.successTitle"),
          text: t("login.successText"),
          confirmButtonText: t("login.continueButtonText"),
          allowOutsideClick: false,
          showCancelButton: false,
        }).then(() => {
          setLogin(true);
          if (decoded.rol === "Estudiante") {
            navigate("/Student");
          } else if (decoded.rol === "Profesor") {
            navigate("/Professor");
          }
        });
      })
      .catch((error) => {
        onError(error);
      });
  };

  const onError = (error) => {
    setLoading(false);
    Swal.fire({
      icon: "error",
      title: t("login.errorTitle"),
      text: t("login.errorText"),
      confirmButtonText: t("login.continueButtonText"),
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("Esto está ocurriendo", error);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="login-container">
      <div className="icon-container">
        <img src={image} alt="Logo" className="Logo-app" />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="title-form">
            <label className="title-login">{t("login.title")}</label>
          </div>
          <div className="form-container">
            <input
              className="input-gmail"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder={t("login.emailPlaceholder")}
            />
            <div className="input-with-icon">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="input-password"
                placeholder={t("login.passwordPlaceholder")}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="button-container">
            <button className="button-login" type="submit">
              {t("login.loginButton")}
            </button>
            <p className="text-register">
              {t("login.noAccount")}{" "}
              <a className="link-register" href="/Registro">
                {t("login.registerLink")}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Login };
