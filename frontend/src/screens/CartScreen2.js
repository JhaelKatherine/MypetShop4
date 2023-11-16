import { useContext } from 'react';
import { Store } from '../Store';
import { Row, Col, ListGroup } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
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
     <ListGroup variant="flush" className="custom-listgroup">
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <>
          <ListGroup.Item className="gray-background">
            <Row>
              <Col xs={4}>
                <div className="title-text">Product</div>
              </Col>
              <Col xs={4}>
                <div className="title-text">Name</div>
              </Col>
              <Col xs={4}>
                <div className="title-text">Subtotal</div>
              </Col>
            </Row>
          </ListGroup.Item>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id} className="gray-background">
              <Row>
                <Col xs={4}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image img-fluid rounded img-thumbnail"
                  />
                </Col>
                <Col xs={4}>
                  <div className="cart-item-details">
                    <p>{item.name + "  x  " + item.quantity}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="cart-item-details">
                    <p>${item.price * item.quantity}</p>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}

          <ListGroup.Item className="gray-background">
            <Row>
              <Col xs={4}>
                <div className="title-text">Total Cost</div>
              </Col>
              <Col xs={4}>
                <div className="title-text"> </div>
              </Col>
              <Col xs={4}>
                <div className="title-text">{calculateTotal()}</div>
              </Col>
            </Row>
          </ListGroup.Item>
        </>
      )}
    </ListGroup>

    </div>
  );
}
