import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Image from "../Resources/title.png";
import Image2 from "../Resources/6.png";
import Navbar from "../Components/Navbar";
import "../Home/Home.css";

// Function principal
function Home() {
  const { t, i18n} = useTranslation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getImageForRoleAndLanguage = () => {
    const language = i18n.language;
    const roleImages = {
        en: require("../Resources/logonav/ingles.png"),
        fr: require("../Resources/logonav/frances.png"),
        es: require("../Resources/logonav/español.png"),
        de: require("../Resources/logonav/aleman.png"),
        md: require("../Resources/logonav/mandarin.png"),
        hd: require("../Resources/logonav/hindi.png"),
        pt: require("../Resources/logonav/portugues.png"),
        rs: require("../Resources/logonav/ruso.png")
      
    };

    return roleImages[language] || require("../Resources/logonav/español.png");
  };

  return (
    <div className="App">
      <Navbar href={"/"} image={getImageForRoleAndLanguage()} role={"home"} />
      <div className="about-us-container">
        <div className="about-us-content">
          <h2>{t("home.aboutUsTitle")}</h2>
          <p>{t("home.aboutUsContent")}</p>
        </div>
        <img src={Image2} alt="Imagen 2" className="about-us-image" />
      </div>
      <div className="container">
        <h3 style={{ color: "white", fontWeight: "bold" }}>
          {t("home.unlockPotential")}
        </h3>
      </div>
    </div>
  );
}

export default Home;
