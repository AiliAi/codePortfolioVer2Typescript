import './footer.scss';
import React from 'react';
import {BsLinkedin} from 'react-icons/bs';

const Footer = (): JSX.Element => {
  return (
    <div className="footer">
      <a
        href="https://www.linkedin.com/in/ailipriimann/"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin className="social-media-icon" />
      </a>
      <p>Made by Aili Priimann 2023</p>
    </div>
  );
};

export default Footer;