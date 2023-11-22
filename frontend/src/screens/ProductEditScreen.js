import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import '../Css/AddUser.css';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;


  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [imageError, setImageError] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [loading2, setLoading] = useState(false);

  const isValidImageUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };
  const checkImageExists = async (url) => {
    try {
      const response = await axios.head(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);
  const handleImageChange = async (e) => {
    const inputValue = e.target.value;
    setImage(inputValue);
    setImageError(''); // Limpiar cualquier mensaje de error existente

    // Validación de la URL solo si hay algún valor
    if (inputValue.trim() !== '') {
      if (!isValidImageUrl(inputValue)) {
        setImageError('Please enter a valid image URL');
        return;
      }

      const imageExists = await checkImageExists(inputValue);
      if (!imageExists) {
        setImageError('Image not found at the provided URL');
        return;
      }
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: {},
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };
  return (
    <div className="blue-background">
      <div className="form-container">
        <div className="centered-title">
          <h1>Edit Product</h1>
        </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
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
                onChange={(e) => setSlug(e.target.value)}
                pattern="[A-Za-z ]+" 
                title="Please enter only letters" 
                maxLength="50"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                pattern="[A-Za-z ]+" 
                maxLength="210"
                title="Please enter only letters" 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                maxLength="50"
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
                maxLength="50"
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
                    const enteredValue = e.target.value.replace(/[e]/gi, ''); // Elimina la letra 'e' en cualquier caso
                    const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
                    if (regex.test(enteredValue)) {
                      setCountInStock(enteredValue);
                    }
                  }}
                  min="1"
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === 'E' || ['+', '-', '*', '/', ';', '.', ','].includes(e.key)) {
                      e.preventDefault(); // Evita la entrada de 'e', 'E', '+' , '-' , '*' y '/'
                    }
                  }}
                required
              />
            </div>
            <div>
            <label htmlFor="imageURL">Image URL</label>
<input
  type="text"
  id="imageURL"
  className={`form-control ${imageError ? 'is-invalid' : ''}`}
  value={image}
  onChange={handleImageChange}
  required
/>
{imageError && <div className="invalid-feedback">{imageError}</div>}
{!isValidImageUrl && (
  <div className="invalid-feedback">Please enter a valid image URL.</div>
)}

            </div>

          <div className="mb-3">
          <Button disabled={loadingUpdate} type="submit" className="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </form>
      )}
            </div>

    </div>
  );
}
