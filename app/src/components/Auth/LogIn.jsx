import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputField from "../form/widgets/InputField/InputField";
import { AuthContext } from "../../api/AuthContext";
import { apiLogin } from "../../api/LogIn";
import "./form.style.css";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = t("form.errors.username");
    if (!formData.password) newErrors.password = t("form.errors.password");

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await apiLogin(formData.username, formData.password);
        login(data.token, { firstName: formData.username });
        navigate("/users");
      } catch (error) {
        setErrors({ api: error.message || t("form.errors.loginFailed") });
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1 className="title-form">{t("nav.logIn")}</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label={t("form.username")}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label={t("form.password")}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button type="submit">{t("nav.logIn")}</button>
          {errors.api && <div className="error">{errors.api}</div>}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
