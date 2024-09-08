import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../api/AuthContext";
import TranslationBtn from "../translationBtn/TranslationBtn";
import "./navbar.style.css";

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <img
                src="https://i.ibb.co/Ry2BRqP/Logo.png"
                alt="Logo"
                className="logo-img"
              />
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">{t("nav.home")}</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/counters">{t("nav.counters")}</Link>
                </li>
                <li>
                  <Link to="/users">{t("nav.users")}</Link>
                </li>
              </>
            )}
          </ul>
          <div className="nav-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/signUp" className="nav-btn">
                  {t("nav.signUp")}
                </Link>
                <Link to="/logIn" className="nav-btn">
                  {t("nav.logIn")}
                </Link>
              </>
            ) : (
              <>
                <button onClick={logout} className="nav-btn">
                  {t("nav.logout")}
                </button>
                <div className="user-name-at-nav">
                  <strong>
                    {user ? `Welcome, ${user.firstName}` : "Welcome"}
                  </strong>
                </div>
              </>
            )}
          </div>
          <TranslationBtn />
        </div>
      </nav>

      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
