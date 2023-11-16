import React, { useState } from 'react';
import '../Css/UserCardInformation.css';

export default function UserCardInformation() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardNumberPattern = /^[0-9]*$/;
    if (!formData.cardNumber.match(cardNumberPattern)) {
      alert('Only numbers are allowed for Card Number.');
      return;
    }

    const expirationDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!formData.expirationDate.match(expirationDatePattern)) {
      alert('Only valid data for Expiration Date: MM/YY.');
      return;
    }

    console.log('Success', formData);
  };

  return (
    <div className="user-card-info-container">
      <div className="form-section">
        <h1>Credit Card</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <div className="form-field-full">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                pattern="[0-9]*"
                title="Put only numbers"
                required
              />
            </div>
            <div className="form-field-half">
              <div className="form-field">
                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                  title="Only valid data: MM/YY."
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-field-half">
              <div className="form-field">
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="proceed-btn-section">
        <div className="proceed-btn-container">
          <button type="submit" className="proceed-btn" onClick={handleSubmit}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

