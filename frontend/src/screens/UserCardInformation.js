
import React from 'react';
import '../Css/UserCardInformation.css';

export default function UserCardInformation() {
  return (
    <div className="user-card-info-container">
      <h1>User Card Information</h1>
      <form>
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" required />

        <label htmlFor="expirationDate">Expiration Date:</label>
        <input type="text" id="expirationDate" name="expirationDate" required />

        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required />

        <label htmlFor="postalCode">Postal Code (Optional):</label>
        <input type="text" id="postalCode" name="postalCode" />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" required />

        <button type="submit" className="proceed-btn">
          Proceed
        </button>
      </form>
    </div>
  );
}
