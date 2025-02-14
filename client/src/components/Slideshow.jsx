import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Slideshow = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const images = [
    './images/gallery1.webp',
    './images/gallery2.webp',
    './images/gallery3.webp',
    './images/gallery4.webp',
    './images/gallery5.webp',
    './images/gallery6.webp',
    './images/gallery7.webp',
    './images/gallery8.webp',
    './images/gallery9.webp',
    './images/gallery10.webp',
    './images/gallery11.webp',
    './images/gallery12.webp',
    './images/gallery13.webp',
    './images/gallery14.webp',
    './images/gallery15.webp',
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
        <h2 id='gallery-heading'>{t("interior-title")}</h2>
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

export default Slideshow;


