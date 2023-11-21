import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
  const { product } = props;

  // Mover el hook useContext fuera de la lógica condicional
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // Verificar si el producto tiene la propiedad status y si es true
  if (!product || !product.status) {
    return null; // No renderizar si no hay status o no es true
  }

  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Lo siento. El producto está agotado');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Sin stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Agregar al carrito</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
