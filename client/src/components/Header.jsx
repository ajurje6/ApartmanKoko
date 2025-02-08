import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"; // Import NavLink

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "hr", label: "Hrvatski", flag: "https://flagcdn.com/w40/hr.png" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { code: "pl", label: "Polski", flag: "https://flagcdn.com/w40/pl.png" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" }, 
  { code: "hu", label: "Magyar", flag: "https://flagcdn.com/w40/hu.png" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu open state

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState); // Toggle the menu visibility
  };

  return (
    <section id="header-section">
      <h1>Apartman Koko</h1>
      <ul
        id="navigation"
        className={menuOpen ? "open" : ""} // Apply "open" class when menu is open
      >
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")} // Conditionally apply the 'active' class
            >
              {t("home")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/accommodation" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("accommodation")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("gallery")}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("contact")}
            </NavLink>
          </li>

        <li className="language-dropdown">
          <button className="dropdown-btn">
            <img
              src={languages.find((lang) => lang.code === selectedLang)?.flag}
              alt={selectedLang}
              width="20"
            />
            {languages.find((lang) => lang.code === selectedLang)?.label}
          </button>
          <div className="dropdown-content">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                <img src={lang.flag} alt={lang.label} width="20" /> {lang.label}
              </button>
            ))}
          </div>
        </li>
      </ul>

      {/* Hamburger Menu Icon */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Header;
