import image from "../Resources/LogoAPP (2).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Loading } from "../Components/loading";
// import { useAuth } from "../Context/AuthContext";
import { login } from "../Services/Users";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const togglePassword = () => {
    setIsVisible(!isVisible);
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataLogin = {
      ...data,
    };
    login(dataLogin).then((response) => {
      try {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Tu inicio de sesión fue exitoso",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          showCancelButton: false,
        }).then(() => {
          localStorage.setItem("token_access", response.access);
          localStorage.setItem("token_refresh", response.refresh);
          navigate("/Home");
        });
      } catch (error) {
        onError(error);
      }
    });
  };
  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ocurrió un error al iniciar sesión",
      confirmButtonText: "Continuar",
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
            <label className="title-login">Iniciar sesión</label>
          </div>
          <div className="form-container">
            <input
              className="input-gmail"
              type="email"
              name="email" // Corregir el nombre del campo
              value={data.email}
              onChange={handleChange}
              placeholder="Correo electronico"
            />
            <div className="input-with-icon">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
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
              <a className="link-register" href="/Registro">
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
