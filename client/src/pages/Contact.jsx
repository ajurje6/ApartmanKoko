import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Form from '../components/Form';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('contact_title')}</title>
        <meta name="description" content={t('contact_description')} />
      </Helmet>
      <Map />
      <Form />
      <Footer />
    </div>
  );
}

export default Contact;
