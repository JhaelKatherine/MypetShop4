import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const [
    { loading, error, order },
    dispatch
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: ''
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        console.log('Order Data:', data); // Agrega s línea
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };



    fetchOrder();
  }, [userInfo, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div style={{ marginBottom: '400px' }}>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      <h2 className="my-3"> Information about your order </h2>
      <h6>
      <span style={{ fontWeight: 'bold' }}>ID:</span> {order.NumberProduct}

</h6>
<h6>
  <span style={{ fontWeight: 'bold' }}>Date:</span>{' '}
  <span style={{ fontWeight: 'normal' }}>
    {format(new Date(order.createdAt), 'MMMM dd, yyyy HH:mm')}
  </span>
  <br>
  </br>
</h6>     
       <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
            <Card.Title style={{ textAlign: 'left' }}>Items</Card.Title>  
                        <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={3} className="text-left">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                    </Col>
                    <Col md={3} className="text-left">
                     <span>{item.name}</span>
                    </Col>
                    <Col md={2} className="text-left">
                      <span>{item.quantity}</span>
                    </Col>
                    <Col md={2} className="text-left">
                      ${' '}{item.price }
                    </Col>
                    <Col md={2} className="text-left">
                      ${' '}{(item.price * item.quantity)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>Order Summary</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col className="text-left" style={{ textAlign: 'left' }}>Items</Col>
            <Col className="text-right" style={{ textAlign: 'right' }}>${' '}{order.itemsPrice.toFixed(2)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col className="text-left" style={{ textAlign: 'left' }}>Delivery</Col>
            <Col className="text-right" style={{ textAlign: 'right' }}>FREE</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col className="text-left" style={{ textAlign: 'left' }}>
              <strong>Order Total</strong>
            </Col>
            <Col className="text-right" style={{ textAlign: 'right' }}>
              <strong>${' '}{order.itemsPrice.toFixed(2)}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
</Col>

      </Row>
    </div>
  );
}
