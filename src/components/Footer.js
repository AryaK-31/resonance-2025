import ResonanceMainLogo from '../assets/ResonanceMainLogo.png'

import {
  locationPng,
  gmailPng,
  linkedinPng,
  twitterPng,
  instaPng,
  facebookPng,
  youtubePng,
} from "../assets";

const Footer = () => {
  return (
    <div className="container-fluid footer-main" id="contact">
      <div className="row d-flex flex-sm-column flex-lg-row justfity-content-center align-items-center footer-main-row">
        <div className="col d-flex justify-content-center align-items-center">
          <img src={ResonanceMainLogo} className="img-fluid footer-resonance-logo" />

        </div>

        <div className="col text-center footer-links-main">
          <div className="row d-flex row-gap-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d3781.002215103389!2d73.81801667519406!3d18.618970132493804!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d18.6186515!2d73.8206292!4m5!1s0x3bc2b88a8500ccc9%3A0x54bab7f2991684a2!2sGG%20International%20School%2C%20Swar%20Ganga%2C%20174%20-%20177%2C%20near%20The%20Muslim%20Co-operative%20Bank%2C%20Vallabh%20Nagar%2C%20Pimpri%20Colony%2C%20Pune%2C%20Maharashtra%20411018!3m2!1d18.6191154!2d73.820847!5e0!3m2!1sen!2sin!4v1752674708308!5m2!1sen!2sin"
              width="150"
              height="150"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="col-5 row-gap-3 footer-contact-us-div-col">
          <div className="row footer-contact-us-div">
            <p className="footer-contact-us">Contact Us:</p>
          </div>
          <div className="row">
            <div className="col-sm-2 d-flex justify-content-lg-end justify-content-sm-start">
              <a
                href="https://www.myggis.org/contact.php"
                target="_blank"
              >
                <img
                  src={locationPng}
                  className="img-fluid footer-contact-icon"
                />
              </a>
            </div>
            <div className="col">
              <a
                href="https://www.myggis.org/contact.php"
                target="_blank"
                className="text-decoration-none"
              >
                <p className="footer-contact-text">
                  GG INTERNATIONAL SCHOOL, PIMPRI
                </p>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 d-flex justify-content-lg-end justify-content-sm-start">
              <a
                href="mailto:ac@myggis.org?subject=Regarding Resonance 2025"
                target="_blank"
              >
                <img src={gmailPng} className="img-fluid footer-contact-icon" />
              </a>
            </div>
            <div className="col">
              <a
                href="mailto:ac@myggis.org?subject=Regarding Resonance"
                target="_blank"
                className="footer-contact-text"
              >
                ac@myggis.org
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row design-with-love">
        <p className="design-with-love-text">
          © Designed and developed with ❤️ by Tech Team at GGIS | Copyright ©2025
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
