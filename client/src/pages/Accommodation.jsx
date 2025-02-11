import React from 'react'
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Perks from '../components/Perks';
import Calendar from '../components/Calendar';
const Accommodation = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Perks/>
      <Calendar/>
      <Footer/>
    </div>
  )
}

export default Accommodation
