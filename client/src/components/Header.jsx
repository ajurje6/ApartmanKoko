import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "hr", label: "Hrvatski", flag: "https://flagcdn.com/w40/hr.png" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { code: "pl", label: "Polski", flag: "https://flagcdn.com/w40/pl.png" },
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
        <li><a href="#about">{t("about")}</a></li>
        <li><a href="#gallery">{t("gallery")}</a></li>
        <li><a href="#pricing">{t("pricing")}</a></li>
        <li><a href="#review">{t("review")}</a></li>
        <li><a href="#contact">{t("contact")}</a></li>
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
