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
import '../Css/CartScreen2.css';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div>
     <h1>YOUR ORDER</h1>
      <Row>
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
                  <div className="cart-item-">
                    <strong>{item.name}</strong>
                  </div>
                  <div >
                  <div key={item._id} className="cart-item-price">
                     <p>Subtotal: ${item.price * item.quantity}</p>
                 </div>
                  </div>
                  <div className="total-cost">
          <p>Total Cost: ${calculateTotal()}</p>
        </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Row>
    </div>
  );
}
