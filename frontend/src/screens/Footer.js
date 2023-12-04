import React from 'react';
import '../Css/Footer.css';
import { Link} from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <img src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png" alt="Logo" className="logo" />
        <p>Follow us</p>
        <div className="social-icons">
  <a href='https://www.tiktok.com/@my_pet_shop023' target="_blank"><img src="https://i.ibb.co/2dX3v8m/tik-tok-1.png" alt="tik-tok-1" className="social-icon" /></a>
  <a href='https://www.facebook.com/profile.php?id=61550120834894' target="_blank"><img src="https://i.ibb.co/pbMXyrq/facebook-1.png" alt="facebook-1" className="social-icon"/></a>
  <a href= 'https://www.instagram.com/petshopcorp7/' target="_blank"><img src="https://i.ibb.co/6g096NP/instagram-1.png" alt="instagram-1" className="social-icon"/></a>
</div>

      </div>
      <div className="column">
  <div className="buy-with-us-text">BUY WITH US:</div>
  <ul className="menu-list1">
    <li>Toys</li>
    <li>Food</li>
    <li>Snack</li>
  </ul>
</div>
      <div className="column">
      <div className="buy-with-us-text">ANY QUESTIONS  ?</div>
        <ul className="menu-list">
      
    <li><a href="/aboutUs">About Us</a></li>

        </ul>
      </div>
    </footer>
  );
};

export default Footer;

