import image from "../Resources/LogoAPP (2).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const togglePassword = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="login-container">
      <div className="icon-container">
        <img src={image} alt="Logo" className="Logo-app" />
      </div>
      <div className="login-form-container">
        <form className="login-form">
          <div className="title-form">
            <label className="title-login">Iniciar sesión</label>
          </div>
          <div className="form-container">
            <input
              className="input-gmail"
              type="email"
              placeholder="Correo electronico"
            />
            <div className="input-with-icon">
              <input
                type={isVisible ? "text" : "password"}
                className="input-password"
                placeholder="Contraseña"
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
            <button className="button-login">Iniciar sesión</button>
            <p className="text-register">
              ¿No tienes una cuenta?{" "}
              <a className="link-register" href="/register">
                Registrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Login };
