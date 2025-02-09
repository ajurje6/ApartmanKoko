import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus(t("message_sent"));
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus(t("message_failed"));
      }
    } catch (error) {
      setStatus(t("message_failed"));
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>{t("contact_info_title")}</h2>
          <h3><strong>{t("title-address")}:</strong></h3>
          <p>{t("address")}</p>
          <h3><strong>{t("title-email")}:</strong></h3>
          <p>{t("email")}</p>
          <h3><strong>{t("title-phone")}:</strong></h3>
          <p>{t("phone")}</p>
        </div>

        <div className="container-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="descr">{t("contact_us")}</div>

            <div className="input">
              <input required autoComplete="off" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              <label htmlFor="name">{t("form-name")}</label>
            </div>

            <div className="input">
              <input required autoComplete="off" name="email" type="email" id="email" value={formData.email} onChange={handleChange} />
              <label htmlFor="email">{t("form-email")}</label>
            </div>

            <div className="input">
              <textarea required cols="30" rows="5" id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
              <label htmlFor="message">{t("form-message")}</label>
            </div>

            <button type="submit">{t("send_message")}</button>
          </form>

          {status && <p className="status-message">{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default Form;
