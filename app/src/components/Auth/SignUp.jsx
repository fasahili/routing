import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputField from "../form/widgets/InputField/InputField";
import CheckboxField from "../form/widgets/CheackboxField/CheckboxField";
import RadioButton from "../form/widgets/RadioButton/RadioButton";
import Summary from "../form/displayData/Summary";
import { AuthContext } from "../../api/AuthContext";
import { apiSignUp } from "../../api/SignUp";
import "./form.style.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = t("form.errors.firstName");
    if (!formData.lastName) newErrors.lastName = t("form.errors.lastName");
    if (!formData.email) newErrors.email = t("form.errors.email");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("form.errors.invalidEmail");
    if (formData.password.length < 8)
      newErrors.password = t("form.errors.passwordLength");
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t("form.errors.passwordMatch");
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = t("form.errors.dateOfBirth");
    if (!formData.gender) newErrors.gender = t("form.errors.gender");
    if (!formData.termsAccepted)
      newErrors.termsAccepted = t("form.errors.termsAccepted");

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          email: formData.email,
          username: formData.firstName + formData.lastName,
          password: formData.password,
          name: {
            firstname: formData.firstName,
            lastname: formData.lastName,
          },
          address: {
            city: "kilcoole",
            street: "7835 new road",
            number: 3,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: "1-570-236-7033",
        };

        const data = await apiSignUp(userData);
        setSubmitted(true);
        login(data.token, { firstName: formData.username });
        navigate("/");
      } catch (error) {
        setErrors({ api: error.message || t("form.errors.apiError") });
      }
    }
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <div className="form-content">
          <h1 className="title-form">{t("nav.signUp")}</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label={t("form.firstName")}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label={t("form.lastName")}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <InputField
              label={t("form.email")}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label={t("form.password")}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              label={t("form.confirmPassword")}
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <InputField
              label={t("form.dateOfBirth")}
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
            />
            <RadioButton
              name="gender"
              label={t("form.gender.label")}
              options={[
                t("form.gender.male"),
                t("form.gender.female"),
                t("form.gender.other"),
              ]}
              value={formData.gender}
              onChange={handleChange}
              error={errors.gender}
            />
            <CheckboxField
              label={t("form.termsAccepted")}
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              error={errors.termsAccepted}
            />
            {errors.api && <div className="error">{errors.api}</div>}
            <button type="submit">{t("nav.signUp")}</button>
          </form>
        </div>
      ) : (
        <Summary formData={formData} />
      )}
    </div>
  );
};

export default SignUp;
