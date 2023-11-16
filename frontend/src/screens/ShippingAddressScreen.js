/*import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CartScreen2 from './CartScreen2';
import '../Css/Shipping.css';

import { Row, Col, ListGroup } from 'react-bootstrap';


export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

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
      payload: { fullName, address, city, postalCode, country, location: shippingAddress.location },
    });
    localStorage.setItem('shippingAddress', JSON.stringify({ fullName, address, city, postalCode, country, location: shippingAddress.location }));
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
            <p className='rojo'>Field are (* )required</p>
            
            <Form onSubmit={submitPaymentHandler }>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label className="label-right">Full Name(*)</Form.Label>
                <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label className="label-right">Nit</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  </Form.Group>


                <Form.Group className="mb-3" controlId="address">
                  <Form.Label className="label-right" >Address(*)</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label className="label-right" >City(*)</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label className="label-right" >Cell Phone(*)</Form.Label>
                  <Form.Control
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Form.Group>
                    </Form>
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
          );*/
          import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import '../Css/Shipping.css';

export default function ShippingAddressScreen() {
  const [name, setName] = useState('');
  const [NIT, setNIT] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cellPhone, setCellPhone] = useState('');
          return (
            <div>
              <Form.Group className="mb-3" controlId="fullName">
  <Form.Label className="form-field-label">Full Name</Form.Label>
  <Form.Control
    type="text"
    onChange={(e) => setName(e.target.value)}
    required
  />
</Form.Group>
<Form.Group className="mb-3" controlId="nit">
  <Form.Label className="form-field-label">NIT</Form.Label>
  <Form.Control
    type="text"
    onChange={(e) => setNIT(e.target.value)}
    required
  />
</Form.Group>
<Form.Group className="mb-3" controlId="address">
  <Form.Label className="form-field-label">Address</Form.Label>
  <Form.Control
    type="text"
    onChange={(e) => setAddress(e.target.value)}
    required
  />
</Form.Group>
<Form.Group className="mb-3" controlId="city">
  <Form.Label className="form-field-label">City</Form.Label>
  <Form.Control
    type="text"
    onChange={(e) => setCity(e.target.value)}
    required
  />
</Form.Group>
<Form.Group className="mb-3" controlId="cellPhone">
  <Form.Label className="form-field-label">Cell Phone</Form.Label>
  <Form.Control
    type="text"
    onChange={(e) => setCellPhone(e.target.value)}
    required
  />
</Form.Group>

              </div>
            
          );
        }