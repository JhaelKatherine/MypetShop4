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

  const { state, dispatch } = useContext(Store);
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
  const [status, setStatus] = useState('');

  const [loadingUpload, setLoadingUpload] = useState(false);

  const isValidImageUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const checkImageExists = async (url) => {
    try {
      const response = await Axios.head(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidImageUrl(image)) {
      setLoading(false);
      toast.error('Please enter a valid image URL');
      return;
    }
    if (name.length > 50) {
      setLoading(false);
      toast.error('The name field should not exceed 50 characters.');
      return;
    }
    
    if (slug.length > 50) {
      setLoading(false);
      toast.error('The slug field should not exceed 50 characters.');
      return;
    }
    
    if (category.length > 50) {
      setLoading(false);
      toast.error('The category field should not exceed 50 characters.');
      return;
    }
    
    if (description.length > 210) {
      setLoading(false);
      toast.error('The description field should not exceed 210 characters.');
      return;
    }
    const imageExists = await checkImageExists(image);

    if (!imageExists) {
      setLoading(false);
      toast.error('Image not found at the provided URL');
      return;
    }

    try {
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

      navigate(`/admin/products`); // Ajusta la ruta según tu configuración

    } catch (err) {
      setLoading(false);
      toast.error('Error adding product');
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
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim(); 
                  if (trimmedValue !== '' || /^\s+$/.test(e.target.value) || e.target.value === '') { 
                    setName(e.target.value);
                  }
                }}
                title="Please enter only letters" 
                maxLength="50"
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
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim(); 
                  if (trimmedValue !== '' || /^\s+$/.test(e.target.value) || e.target.value === '') { 
                    setSlug(e.target.value);
                  }
                }}
                //pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                maxLength="50" // Limitar a 50 caracteres

                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => {
                    const enteredValue = e.target.value;
                    // Verifica si el formato del número decimal es correcto (al menos un dígito seguido opcionalmente por un punto y uno o más dígitos)
                    if (/^\d+(\.\d*)?$/.test(enteredValue)) {
                      setPrice(enteredValue);
                    }
                  }}
                  min="1"
                  max="1000"
                  onKeyDown={(e) => {
                    // Evita caracteres que no sean números o puntos decimales
                    if (
                      !(
                        (e.key >= '0' && e.key <= '9') ||
                        e.key === '.' ||
                        e.key === 'Backspace' ||
                        e.key === 'Delete' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight'
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                className="form-control"
                value = {description}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  if (e.target.value !== '' && trimmedValue !== '') {
                    setDescription(e.target.value);
                  }
                }}
                title="Please enter only letters" 
                maxLength="210" 
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
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim(); 
                  if (trimmedValue !== '' || /^\s+$/.test(e.target.value) || e.target.value === '') { 
                    setCategory(e.target.value);
                  }
                }}
                title="Please enter only letters" 
                maxLength="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                maxLength="50"
                className="form-control"
                value={brand}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  if (trimmedValue !== '' || /\s+$/.test(e.target.value)) {
                    setBrand(e.target.value);
                  }
                }}
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
                    const enteredValue = e.target.value.replace(/[e]/gi, ''); // Elimina la letra 'e' en cualquier caso
                    const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
                    if (regex.test(enteredValue)) {
                      setCountInStock(enteredValue);
                    }
                  }}
                  min="1"
                  max="1000"

                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === 'E' || ['+', '-', '*', '/', ';', '.', ','].includes(e.key)) {
                      e.preventDefault(); // Evita la entrada de 'e', 'E', '+' , '-' , '*' y '/'
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
                maxLength="1500"
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