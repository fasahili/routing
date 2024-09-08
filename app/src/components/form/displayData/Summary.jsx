import React from "react";
import "./summary.style.css";
import { useTranslation } from "react-i18next";

const Summary = ({ formData }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="summary-container">
      <h2 className="summary-title">{t("form.Success")}</h2>
      <div className="summary-content">
        <p>
          <strong>{t("form.firstName")}:</strong> {formData.firstName}
        </p>
        <p>
          <strong>{t("form.lastName")}:</strong> {formData.lastName}
        </p>
        <p>
          <strong>{t("form.email")}:</strong> {formData.email}
        </p>
        <p>
          <strong>{t("form.dateOfBirth")}:</strong> {formData.dateOfBirth}
        </p>
        <p>
          <strong>{t("form.gender.label")}:</strong> {formData.gender}
        </p>
      </div>
    </div>
  );
};

export default Summary;
