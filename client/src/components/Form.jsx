import React from 'react';
import { useTranslation } from 'react-i18next';

const Form = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>{t('contact_info_title')}</h2>
          <h3><strong>{t('title-address')}:</strong></h3>
          <p>{t('address')}</p>
          <h3><strong>{t('title-email')}:</strong></h3>
          <p>{t('email')}</p>
          <h3><strong>{t('title-phone')}:</strong></h3>
          <p>{t('phone')}</p>
        </div>

        <div className="container-form">
          <form className="form">
            <div className="descr">{t('contact_us')}</div>

            <div className="input">
              <input required autoComplete="off" type="text" id="name" name="name" />
              <label htmlFor="name">{t('form-name')}</label>
            </div>

            <div className="input">
              <input required autoComplete="off" name="email" type="email" id="email" />
              <label htmlFor="email">{t('form-email')}</label>
            </div>

            <div className="input">
              <textarea required cols="30" rows="5" id="message" name="message"></textarea>
              <label htmlFor="message">{t('form-message')}</label>
            </div>

            <button type="submit">{t('send_message')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Form;
