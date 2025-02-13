import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Perks from '../components/Perks';
import Calendar from '../components/Calendar';
import Inquiry from '../components/Inquiry';

const Accommodation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('accommodation_title')}</title>
        <meta name="description" content={t('accommodation_description')} />
      </Helmet>
      <Perks />
      <Calendar />
      <Footer />
    </div>
  );
}

export default Accommodation;
