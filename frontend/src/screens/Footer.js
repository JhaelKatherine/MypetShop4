import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <img src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png" alt="Logo" className="logo" />
        <p>Follow us</p>
        <div className="social-icons">
          <a href="https://imgbb.com/"><img src="https://i.ibb.co/2dX3v8m/tik-tok-1.png" alt="tik-tok-1" className="social-icon" /></a>
          <a href="https://imgbb.com/"><img src="https://i.ibb.co/pbMXyrq/facebook-1.png" alt="facebook-1" className="social-icon"/></a>
          <a href="https://imgbb.com/"><img src="https://i.ibb.co/6g096NP/instagram-1.png" alt="instagram-1" className="social-icon"/></a>
        </div>
      </div>
      <div className="column">
        <ul className="menu-list">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="column">
        <ul className="menu-list">
          <li>Terms and conditions</li>
          <li>Privacy policy</li>
          <li>Frequently asked questions</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

