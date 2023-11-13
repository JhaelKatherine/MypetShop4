import React from 'react';
import '../Css/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <button>
          <img src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png" alt="Logo" />
        </button> 
      </div>
        
      <div className="InputContainer">
      <input
        placeholder="Search.."
        id="input"
        className="input"
        name="text"
        type="text"
      />
    </div>
    
    <div className="icons">
         <a href=""><img src="https://i.ibb.co/ThQrF5g/shopping-Cart-Icon-1.png" alt="shopping-Cart-Icon-1" className="cart-img" /></a>
      </div>
      
      <div className="icons">
         <a href=""><img src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png" className="profile-img" /></a>
      </div>
    </header>
  );
}

export default Header;



