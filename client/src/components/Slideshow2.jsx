import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Slideshow2 = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const images = [
    './images/gallery16.webp',
    './images/gallery17.webp',
    './images/gallery18.webp',
    './images/gallery19.webp',
    './images/gallery20.webp',
    './images/gallery21.webp',
    './images/gallery22.webp',
    './images/gallery23.webp',
    './images/gallery24.webp',
    './images/gallery25.webp',
  ];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <div id='gallery-title-div'>
        <h2 id='gallery-heading'>{t("exterior-title")}</h2>
      </div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openModal(index)}
          >
            <img src={image} alt={`Image ${index}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Modal Slideshow */}
      {isModalOpen && (
        <div className="modal-g" onClick={closeModal}>
          <div className="modal-content-g" onClick={(e) => e.stopPropagation()}>
            <button className="arrow left" onClick={prevImage}>
              &#8592;
            </button>
            <img src={images[currentImageIndex]} alt="Slideshow" loading="lazy" />
            <button className="arrow right" onClick={nextImage}>
              &#8594;
            </button>
            <button className="close-btn" onClick={closeModal}>
              &#10006;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow2;


