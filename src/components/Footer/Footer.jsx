import React from 'react';
import './Footer.css';
import icon from './../../assets/svgs/creatow-icon.svg';
import { twitterIcon, mediumIcon, linkedinIcon, discordIcon } from "./../../assets/svgs/socials/index.js"

const Footer = () => {
  return (
    <footer className="footer overflow-hidden">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={icon} alt="Creatow logo" />
          <h1>Creatow</h1>
        </div>
        <div className="footer-links">
          <div className="contact-us">
            <div className='md:flex md:justify-between'>
            <div className='md:max-w-[50%]'>
            <h4 className='mx-auto'>About Creatow</h4>
            <p>Build a loyal fanbase, distibute digital collectibles and monetise your content. A free to use platform for creators, collectors and brands.</p>
            </div>
            <div>
              <h4 className='mx-auto'>Contact Us</h4>
              <ul>
                <li>Partnerships</li>
                <li>Creators</li>
                <li>Brands</li>
              </ul>
            </div>
            </div>
            <div>
              <h4 className='mx-auto'>Follow Us</h4>
              <div className="socials">
                <a href="https://twitter.com/GetCreatow" target="_blank">
                  <img src={twitterIcon} alt="Twitter Icon" />
                </a>
                <a href="https://creatow.medium.com" target="_blank">
                  <img src={mediumIcon} alt="Medium Icon" />
                </a>
                <a href="https://linkedin.com/company/creatow/" target="_blank">
                  <img src={linkedinIcon} alt="Linkedin Icon" />
                </a>
                  <img src={discordIcon} alt="discord" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="footer-end flex flex-col-reverse md:justify-between md:flex-row">
        <p className='my-auto'>Copyright &copy; Creatow All rights reserved 2024-26</p>
          <ul className='flex flex-col md:flex-row md:gap-4'>
            <li><a href="#">Copyright Issue</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
      </div>
    </footer>
  );
};

export default Footer;
