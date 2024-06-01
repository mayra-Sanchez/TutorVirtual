import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/index";
import { LogginWrapper } from "./Components/Context/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LogginWrapper>
      <App />
    </LogginWrapper>
  </React.StrictMode>
);
