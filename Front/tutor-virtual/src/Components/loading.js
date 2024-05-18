import imageLoading from "../Resources/logo (2).png";
import "./loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="logoContainer">
        <img src={imageLoading} alt="Logo" className="logo-loading" />
      </div>
    </div>
  );
}
export { Loading };
