import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import en from "./locales/en.json";
import hr from "./locales/hr.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";
import ru from "./locales/ru.json";
import hu from "./locales/hu.json";  

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hr: { translation: hr },
    de: { translation: de },
    pl: { translation: pl },
    ru: { translation: ru },
    hu: {translation: hu}
  },
  lng: "en", // Default language
  fallbackLng: "hr",
  interpolation: { escapeValue: false }
});

export default i18n;

