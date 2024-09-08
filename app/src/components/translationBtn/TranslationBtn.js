import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./TranslationBtn.style.css";
import i18n from "../../utils/localization/i18n";

const TranslationBtn = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    changeLanguage(language);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <div className="language-toggle-container">
      <button
        type="button"
        onClick={toggleLanguage}
        className="language-button"
      >
        <FontAwesomeIcon icon={language === "en" ? faLanguage : faGlobe} />
      </button>
    </div>
  );
};

export default TranslationBtn;
