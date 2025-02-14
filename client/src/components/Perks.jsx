import React from "react";
import { useTranslation } from "react-i18next";
import { FaWifi, FaCar, FaHotTub, FaSnowflake, FaTv, FaUtensils, FaWater } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";

const Perks = () => {
  const { t } = useTranslation();

  const perksList = [
    { icon: <FaWater className="perk-icon" />, text: t("sea_view") },
    { icon: <MdSquareFoot className="perk-icon" />, text: "56m²" },
    { icon: <FaHotTub className="perk-icon" />, text: t("jacuzzi") },
    { icon: <FaCar className="perk-icon" />, text: t("free_parking") },
    { icon: <FaWifi className="perk-icon" />, text: t("wifi") },
    { icon: <FaSnowflake className="perk-icon" />, text: t("air_conditioning") },
    { icon: <FaTv className="perk-icon" />, text: t("tv") },
    { icon: <FaUtensils className="perk-icon" />, text: t("fully_equipped_kitchen") },
  ];

  return (
    <section className="perks-section">
      <div className="perks-container">
        {/* Left Side - Image */}
        <img src="/images/perks2.webp" alt="Apartment" className="perks-image" />

        {/* Right Side - Perks Title + Perks Grid */}
        <div className="perks-content">
          <h2 className="perks-title">{t("perks")}</h2>

          <div className="perks-grid">
            {perksList.map((perk, index) => (
              <div key={index} className="perk-item">
                {perk.icon}
                <span className="perk-text">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perks;
