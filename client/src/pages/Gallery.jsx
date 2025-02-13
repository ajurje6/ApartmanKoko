import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import Slideshow2 from '../components/Slideshow2';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
   const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t("gallery_title")}</title>
        <meta name="description" content={t("gallery_description")} />
      </Helmet>
      <Slideshow />
      <Slideshow2 />
      <Footer />
    </div>
  );
}

export default Gallery;

