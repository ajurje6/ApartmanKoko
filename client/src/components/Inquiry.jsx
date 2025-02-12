import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Inquiry = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    arrival: "",
    departure: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        window.alert(t("message_sent")); // Show success alert
        setFormData({
          name: "",
          surname: "",
          email: "",
          phone: "",
          arrival: "",
          departure: "",
          message: "",
        }); // Reset form
        setIsModalOpen(false); // Close the modal after successful submission
      } else {
        window.alert(t("message_failed")); // Show failure alert
      }
    } catch (error) {
      window.alert(t("message_failed")); // Show failure alert
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button onClick={() => setIsModalOpen(true)}>{t("open_inquiry_form")}</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times; {/* Close button */}
            </button>

            <form className="form" onSubmit={handleSubmit}>
              <div className="descr">{t("contact_us")}</div>

              <div className="input">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("your-name")}
                />
                <label htmlFor="name">{t("your-name")}</label>
              </div>

              <div className="input">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder={t("your-surname")}
                />
                <label htmlFor="surname">{t("your-surname")}</label>
              </div>

              <div className="input">
                <input
                  required
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("your-email")}
                />
                <label htmlFor="email">{t("your-email")}</label>
              </div>

              <div className="input">
                <input
                  required
                  autoComplete="off"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("your-phone")}
                />
                <label htmlFor="phone">{t("your-phone")}</label>
              </div>

              <div className="input">
                <input
                  required
                  type="date"
                  id="arrival"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  placeholder={t("your-arrival")}
                />
                <label htmlFor="arrival">{t("your-arrival")}</label>
              </div>

              <div className="input">
                <input
                  required
                  type="date"
                  id="departure"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  placeholder={t("your-departure")}
                />
                <label htmlFor="departure">{t("your-departure")}</label>
              </div>

              <div className="input">
                <textarea
                  required
                  cols="30"
                  rows="3"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("your-message")}
                ></textarea>
                <label htmlFor="message">{t("your-message")}</label>
              </div>

              <button type="submit">{t("send_message")}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiry;
