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
          import Axios from 'axios';
          import { Link, useLocation, useNavigate } from 'react-router-dom';
          import Container from 'react-bootstrap/Container';
          import Form from 'react-bootstrap/Form';
          import Button from 'react-bootstrap/Button';
          import { Helmet } from 'react-helmet-async';
          import { useContext, useEffect, useState } from 'react';
          import { Store } from '../Store';
          import { toast } from 'react-toastify';
          import { getError } from '../utils';
          import '../Css/AddUser.css';
          
          
          export default function ShippingAddressScreen() {
            const navigate = useNavigate();
            const { search } = useLocation();
          
            const [name, setName] = useState('');
            const [lastName, setLastName] = useState('');
            const [userName, setUserName] = useState('');
          
          
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');
          
            const { state, dispatch: ctxDispatch } = useContext(Store);
            const { userInfo } = state;
            const submitHandler = async (e) => {
              e.preventDefault();
              if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
              }
              try {
                const { data } = await Axios.post('/api/users/signup', {
                  name,
                  lastName,
                  userName,
                  email,
                  password,
                });
              } catch (err) {
                toast.error(getError(err));
              }
            };
          
            return (
              <>          
                <div className="form-container">
          
                  <form onSubmit={submitHandler} className="custom-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        id="userName"
                        className="form-control"
                        onChange={(e) => setUserName(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("This field is required")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <button className="submit" type="submit">Sign Up</button>
                          <p className="signin">Register with</p>
                          <div className="social-buttons-container">
                          <button className="social-button google-button">
                              <img src="https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg" alt="Google" />
                              Google
                          </button>
                          <button className="social-button facebook-button">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" />
                              Facebook
                          </button>
                    </div>
                    <div className="mb-3">
                      Already have an account? <Link to="/signin" className="signin">Sign-In</Link>
                      </div>
                  </form>
                </div>          
              </>
            );
          };