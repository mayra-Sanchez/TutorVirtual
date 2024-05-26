import { logout } from "../Services/Users";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./Navbar.css";

//Navbar
function Navbar({ image, role, href }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("token_refresh");
    const requestBody = {
      refresh: refreshToken,
    };
    logout(requestBody).then((response) => {
      try {
        localStorage.removeItem("token_access");
        localStorage.removeItem("token_refresh");
        localStorage.removeItem("user_id");
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
      } catch (error) {
        onError(error);
      }
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
              <a
                href={"javasvript:void(0)"}
                onClick={handleLogout}
                className="navbar-home"
              >
                Cerrar sesión
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
