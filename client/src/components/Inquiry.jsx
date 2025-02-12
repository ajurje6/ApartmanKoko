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
    <div className="reservation and inquiry container">
      <div className="reservation-links">
      <a href="https://www.booking.com/hotel/hr/apartman-koko.hr.html?aid=356980&label=gog235jc-1FCAsoZUINYXBhcnRtYW4ta29rb0gQWANoZYgBAZgBELgBGMgBDNgBAegBAfgBAogCAagCBLgC6NuyvQbAAgHSAiRiZGNkMDkxYi0xNjQxLTRhMmEtODViZS03YzBiNzM5MTJkNzfYAgXgAgE&sid=7ba54be27c9e52841fa1bcc7731c31a8&dest_id=-87968&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1739369967&srpvid=099864b5f80b0049&type=total&ucfs=1&" target="_blank" rel="noopener noreferrer">
      <img src="images/booking.png" alt="airbnb"/>
  </a>
  <a href="https://hr.airbnb.com/rooms/47483345?search_mode=regular_search&adults=1&check_in=2025-06-15&check_out=2025-06-20&children=0&infants=0&pets=0&source_impression_id=p3_1739370036_P3O7" target="_blank" rel="noopener noreferrer">
    <img src="images/airbnb.png" alt="airbnb"/>
    </a>
     {/* Open Modal Button */}
    <button className="button-o" onClick={() => setIsModalOpen(true)}>{t("open_inquiry_form")}</button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times; {/* Close button */}
            </button>

            <form className="form-i" onSubmit={handleSubmit}>
              <div className="descr-i">{t("inquiry_us")}</div>

              <div className="input-i">
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

              <div className="input-i">
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

              <div className="input-i">
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

              <div className="input-i">
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

              <div className="input-i">
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

              <div className="input-i">
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

              <div className="input-i">
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

              <button className="button-i" type="submit">{t("send_message")}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiry; 
