import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import en from "./locales/en.json";
import hr from "./locales/hr.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hr: { translation: hr },
    de: { translation: de },
    pl: { translation: pl }
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
