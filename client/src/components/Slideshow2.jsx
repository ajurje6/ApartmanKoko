import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Slideshow2 = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false); // Define the modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const images = [
    './images/gallery16.jpg',
    './images/gallery17.jpg',
    './images/gallery18.jpg',
    './images/gallery19.jpg',
    './images/gallery20.jpg',
    './images/gallery21.jpg',
    './images/gallery22.jpg',
    './images/gallery23.jpg',
    './images/gallery24.jpg',
    './images/gallery25.jpg',
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
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>

      {/* Modal Slideshow */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="arrow left" onClick={prevImage}>
              &#8592;
            </button>
            <img src={images[currentImageIndex]} alt="Slideshow" />
            <button className="arrow right" onClick={nextImage}>
              &#8594;
            </button>
            <button className="close-btn" onClick={closeModal}>
              &#10006; {/* Close button */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow2;

