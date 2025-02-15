import React from 'react'
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {
  return (
    <section id="footer">
      <div id="footer-box" className="container">
        <ul id="social-media-list">
          <li title="Facebook">
            <a
              className="social-media-links"
              href="https://www.facebook.com/people/Apartman-Koko/61557551717310/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li title="Instagram">
            <a
              className="social-media-links"
              href="https://www.instagram.com/apartmankoko/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            </li>
            <li title="TikTok">
            <a
              className="social-media-links"
              href="https://www.tiktok.com/@apartmankoko?_t=ZN-8tkLMh2UKb0&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </li>
        </ul>
        <h4>Apartman Koko</h4>
        <p id="copyright">
          &copy;<em> 2025, All rights reserved</em> <br />
          <strong>Antonio Jurjevic, Apartman Koko</strong>
        </p>
      </div>
    </section>
  );
};

export default Footer;

