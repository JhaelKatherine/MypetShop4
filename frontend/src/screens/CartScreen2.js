
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
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
              <ListGroup.Item>
                <h2>Cantidad</h2> {/* Título de la sección */}
              </ListGroup.Item>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <div className="cart-item-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image img-fluid rounded img-thumbnail"
                    />
                    <div className="cart-item-buttons">
                      <h3>{item.quantity}</h3> {/* Mostrar la cantidad de cada artículo */}
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
