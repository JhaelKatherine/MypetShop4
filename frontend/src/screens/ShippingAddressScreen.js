import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CartScreen2 from './CartScreen2';
import '../Css/Shipping.css';

import { ListGroup } from 'react-bootstrap';


export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [nit, setNit] = useState(shippingAddress.nit || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [cellPhone, setCellPhone] = useState(shippingAddress.cellPhone || '');

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

  const [fullNameError, setFullNameError] = useState('');
  const [nitError,setNitError] = useState('');

  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [cellPhoneError, setCellPhoneError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }, [userInfo, navigate]);

  const validateForm = () => {
    let isValid = true;

    <div className={`error-message${fullNameError && !fullName.trim() ? ' error-highlight' : ''}`}>
  </div>
   if (!fullName.trim()) {
    setFullName('Address is required');
    isValid = false;
  } else {
    setFullNameError('');
  }


    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }

    if (!city.trim()) {
      setCityError('City is required');
      isValid = false;
    } else {
      setCityError('');
    }

    if (!cellPhone.trim()) {
      setCellPhoneError('Cell Phone is required');
      isValid = false;
    } else {
      setCellPhoneError('');
    }

    return isValid;
  };

  const submitShippingHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      ctxDispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: { fullName, nit, address, city, cellPhone },
      });
      localStorage.setItem('shippingAddress', JSON.stringify({ fullName, nit, address, city, cellPhone }));
    } else {
      console.log('Please complete the required fields correctly.');
    }
  };

  const submitPaymentHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      submitShippingHandler(e);
      ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
      localStorage.setItem('paymentMethod', paymentMethodName);
      navigate('/placeorder');
    } else {
      console.log('Please complete the required fields correctly.');
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="small-container">
            <h1 className="my-3">Billing Details</h1>
            <p className='rojo'>Field are (*)required</p>
            <form onSubmit={submitPaymentHandler} className="custom-form">
            <div className="form-group">
  <label htmlFor="fullName">Full Name(*)</label>
  <input
    type="text"
    id="fullName"
    className="form-control"
    value={fullName}
    onChange={(e) => {
      const regex = /^[A-Za-z\s]+$/;
      const value = e.target.value;
      if (regex.test(value) || value === '') {
        setFullName(value);
        e.target.setCustomValidity(''); // Restablece el mensaje de error
        setFullNameError(''); // Reset the error message
      } else {
        e.target.setCustomValidity("Please enter only letters and spaces");
        setFullNameError('Please enter only letters and spaces');
      }
    }}
    pattern="^[A-Za-z\s]+$"
    title="Please enter only letters and spaces"
  />
  {fullNameError && (
    <div className="error-message">{fullNameError}</div>
  )}
</div>


<div className="form-group">
  <label htmlFor="nit">Nit</label>
  <input
    type="text"
    id="nit"
    className="form-control"
    value={nit}
    onChange={(e) => {
      const regex = /^[0-9]*$/;
      const value = e.target.value;
      if (regex.test(value) || value === '') {
        setNit(value);
        e.target.setCustomValidity('');
        setNitError('');
      } else {
        e.target.setCustomValidity("Please enter only numbers");
        setNitError('Please enter only numbers');
      }
    }}
    required
  />
  {nitError && (
    <div className="error-message">{nitError}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="address">Address(*)</label>
  <input
    type="text"
    id="address"
    className="form-control"
    value={address}
    onChange={(e) => {
      const regex = /^[A-Za-z0-9\s]+$/;
      const value = e.target.value;
      if (regex.test(value) || value === '') {
        setAddress(value);
        e.target.setCustomValidity('');
        setAddressError('');
      } else {
        e.target.setCustomValidity("Please enter valid address");
        setAddressError('Please enter valid address');
      }
    }}
    required
  />
  {addressError && (
    <div className="error-message">{addressError}</div>
  )}
</div>
  
<div className="form-group">
  <label htmlFor="city">City(*)</label>
  <input
    type="text"
    id="city"
    className="form-control"
    value={city}
    onChange={(e) => {
      const regex = /^[A-Za-z\s]+$/;
      const value = e.target.value;
      if (regex.test(value) || value === '') {
        setCity(value);
        e.target.setCustomValidity('');
        setCityError('');
      } else {
        e.target.setCustomValidity("Please enter valid city name");
        setCityError('Please enter valid city name');
      }
    }}
    required
  />
  {cityError && (
    <div className="error-message">{cityError}</div>
  )}
</div>
    <div className="form-group">
  <label htmlFor="cellPhone">Cell Phone(*)</label>
  <input
    type="text"
    id="cellPhone"
    className="form-control"
    value={cellPhone}
    onChange={(e) => {
      const regex = /^[0-9]*$/;
      const value = e.target.value;
      if (regex.test(value) || value === '') {
        setCellPhone(value);
        e.target.setCustomValidity('');
        setCellPhoneError('');
      } else {
        e.target.setCustomValidity("Please enter only numbers");
        setCellPhoneError('Please enter only numbers');
      }
    }}
    required
  />
  {cellPhoneError && (
    <div className="error-message">{cellPhoneError}</div>
  )}
</div>
</form>


                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="small-container">
                    <Form onSubmit={submitPaymentHandler}>
                      <div className='customCartScreen'>
                        <CartScreen2/>
                      </div>
                      <div>
                      
                      <ListGroup variant="flush">
                        
                        <ListGroup.Item className='gray-background'>
                          <div className="mb-3">
                            <Form.Check
                              type="radio"
                              id="PayPal"
                              label="PayPal"
                              value="PayPal"
                              checked={paymentMethodName === 'PayPal'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                          </div>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className='gray-background'>
                          <div className="mb-3">
                            <Form.Check
                              type="radio"
                              id="Stripe"
                              label="Stripe"
                              value="Stripe"
                              checked={paymentMethodName === 'Stripe'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                      </div>
                      
                      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" type="submit">Continue</Button>
      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          );
  }