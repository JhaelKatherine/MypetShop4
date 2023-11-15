import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/CartScreen.css';

export default function CartScreen() {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <div className="cart-item-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image img-fluid rounded img-thumbnail"
                  />
                  <div className="cart-item-buttons">
                   
                    <span>{item.quantity}</span>{' '}

                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      </Row>
    </div>
  );
}