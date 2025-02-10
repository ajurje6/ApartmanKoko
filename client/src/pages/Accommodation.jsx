import React from 'react'
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Perks from '../components/Perks';
const Accommodation = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Perks/>
      <Footer/>
    </div>
  )
}

export default Accommodation
