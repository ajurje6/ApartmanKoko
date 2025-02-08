import React from 'react'

const Map = () => {
  return (
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.7594939832934!2d17.017767911734353!3d43.31929387384257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134aef20d2aa76fd%3A0x269e6899bab94528!2sApartman%20Koko%20with%20private%20jacuzzi!5e0!3m2!1shr!2shr!4v1739022519150!5m2!1shr!2shr"
    width="100%"
    height="550"
    style={{ border: "0" }}  // Correct way to apply styles
    allowFullScreen={true}   // Correct attribute for allowfullscreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"  // Correct attribute for referrerpolicy
  ></iframe>
  
  )
}

export default Map
