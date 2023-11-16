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
    fullBox,
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [nit, setNit] = useState(shippingAddress.nit || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [cellPhone, setCellPhone] = useState(shippingAddress.cellPhone || '');

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitShippingHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, nit ,address, city, cellPhone},
    });
    localStorage.setItem('shippingAddress', JSON.stringify({ fullName, nit ,address, city, cellPhone}));
  };

  const submitPaymentHandler = (e) => {
    e.preventDefault();
    submitShippingHandler(e);
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

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
    } else {
      e.target.setCustomValidity("Please enter only letters and spaces");
    }
  }}
/>

  </div>
  
  <div className="form-group">
    <label htmlFor="address">Address(*)</label>
    <input
      type="text"
      id="address"
      className="form-control"
      value={address}
      onChange={(e) => {
        const regex = /^[A-Za-z\s]+$/; // Expresión regular para aceptar solo letras y espacios
        if (regex.test(e.target.value) || e.target.value === '') {
          setCity(e.target.value);
        } <div className="form-group">
        <label htmlFor="nit">Nit</label>
        <input
          type="text"
          id="nit"
          className="form-control"
          value={nit}
          onChange={(e) => {
            const regex = /^[0-9]+$/; // Expresión regular para aceptar solo números
            if (regex.test(e.target.value) || e.target.value === '') {
              setNit(e.target.value);
            }
          }}
          onInvalid={(e) => e.target.setCustomValidity("Only numbers are allowed")}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />
      </div>
      }}
      onInvalid={(e) => e.target.setCustomValidity("This field is required")}
      onInput={(e) => e.target.setCustomValidity('')}
      required
    
      
    />
  </div>
  <div className="form-group">
    <label htmlFor="city">City(*)</label>
    <input
      type="text"
      id="city"
      className="form-control"
      value={city}
      onChange={(e) => {
        const regex = /^[A-Za-z\s]+$/; // Expresión regular para aceptar solo letras y espacios
        if (regex.test(e.target.value) || e.target.value === '') {
          setCity(e.target.value);
        }
      }}
      onInvalid={(e) => e.target.setCustomValidity("This field is required")}
      onInput={(e) => e.target.setCustomValidity('')}
      required
    />
    </div>
    <div className="form-group">
    <label htmlFor="cellPhone">Cell Phone(*)</label>
    <input
      type="text"
      id="cellPhone"
      className="form-control"
      onChange={(e) => {
        const regex = /^[0-9]+$/; // Expresión regular para aceptar solo números
        if (regex.test(e.target.value) || e.target.value === '') {
          setCellPhone(e.target.value);
        }
      }}
      onInvalid={(e) => e.target.setCustomValidity("Only numbers are allowed")}
      onInput={(e) => e.target.setCustomValidity('')}
      required
    />
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
                      
                      <div className="margin">
                        <Button variant="primary" type="submit">Continue</Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          );
  }