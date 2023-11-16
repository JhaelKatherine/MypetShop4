import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import '../Css/ProductList.css';

const ProductList = ({ products }) => {
  return (
    <ListGroup>
      {products.map((item) => (
        <ListGroup.Item key={item._id}>
          <div className="cart-item-container">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image img-fluid rounded img-thumbnail"
            />
            <div className="cart-item-description">
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <p>{"$" + item.price}</p>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ProductList;
