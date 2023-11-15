import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

export default function AddProductScreen() {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await Axios.post('/api/products', {
        name,
        slug,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      });
      setLoading(false);
      toast.success('Producto agregado exitosamente');
      // Redirige a la página de detalles del nuevo producto, si es necesario.

    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  const uploadFileHandler = async (imageUrl) => {
    try {
      setLoading(true);
      const { data } = await Axios.post(
        '/api/upload',
        { url: imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setLoading(false);
      setImage(data.secure_url);
      toast.success('Imagen cargada exitosamente. Haz clic en "Agregar" para aplicarla.');
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    
    <Container className="small-container">
      <title>Añadir Producto</title>
      <h1>Añadir Producto</h1>
      {loading ? (
        <LoadingBox />
      ) : (
        <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="slug">
                 <Form.Label>Slug</Form.Label>
                 <Form.Control
                   value={slug}
                   onChange={(e) => setSlug(e.target.value)}
                   required
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="imageFile">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={uploadFileHandler} />
                {loadingUpload && <LoadingBox></LoadingBox>}

              </Form.Group>    
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Subir Imagen</Form.Label>
            <Form.Control type="text" onChange={(e) => setImage(e.target.value)}
              value={image}
              required />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Agregar</Button>
          </div>
        </Form>
      )}
    </Container>
  );
}