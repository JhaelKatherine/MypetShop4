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
import '../Css/AddUser.css';


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

  const isValidImageUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!isValidImageUrl(image)) {
        setLoading(false);
        toast.error('Please enter a valid image URL');
        return;
      }

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
      toast.success('Product successfully added');
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
    <div className="blue-background">
      <div className="form-container">
        <div className="centered-title">
          <h1>Add Product</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : (
          <form onSubmit={submitHandler} className="custom-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                className="form-control"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => {
                    const enteredValue = e.target.value.replace(/[e]/gi, ''); // Elimina la letra 'e' en cualquier caso
                    const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
                    if (regex.test(enteredValue)) {
                      setPrice(enteredValue);
                    }
                  }}
                  min="1"
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === 'E') {
                      e.preventDefault(); // Evita la entrada del carácter 'e'/'E'
                    }
                  }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                className="form-control"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="number"
                id="countInStock"
                className="form-control"
                value={countInStock}
                onChange={(e) => {
                    onkeydown="return event.keyCode !== 69"
                    const enteredValue = e.target.value;
                    const intValue = parseInt(enteredValue, 10);
              
                    if (!isNaN(intValue) && Number.isInteger(intValue)) {
                      setCountInStock(intValue.toString());
                    }
                  }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageURL">Image URL</label>
              <input
                type="text"
                id="imageURL"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <button className="submit" type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
}