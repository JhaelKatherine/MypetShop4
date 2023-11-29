import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import FilterLogic from "./FilterLogic";
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  
  const [successDelete, setSuccessDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");

  const categoryButtonsPets = [
    { label: "Dog Food", imageUrl: "https://images.ecestaticos.com/RYyHCyWe7IE6v1LNdx-ud8zj-KM=/0x0:2121x1414/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd67%2Fa8d%2F860%2Fd67a8d8604edeac49386e96e2890fe7a.jpg", onClick: () => console.log("Acción para Dog Food") },
    { label: "Cat Food", imageUrl: "https://laverdadnoticias.com/__export/1679601873554/sites/laverdad/img/2023/03/23/mishicomiendo.jpg_1953115887.jpg", onClick: () => console.log("Acción para Cat Food") },
    { label: "Dog Accessories", imageUrl: "https://img.freepik.com/fotos-premium/cumpleanos-animales-lindos_759095-115240.jpg", onClick: () => console.log("Acción para Dog Accessories") },
    { label: "Cat Litter", imageUrl: "https://s.alicdn.com/@sc04/kf/H8494b319e9de4996845a361b9758d82et.jpg", onClick: () => console.log("Acción para Cat Litter") },
    { label: "Cat Accessories", imageUrl: "https://us.123rf.com/450wm/colnihko/colnihko2306/colnihko230600052/205883575-cute-fluffy-cat-celebrates-birthday-in-cap-on-festive-balloons-background-generative-ai-illustration.jpg?ver=6", onClick: () => console.log("Acción para Cat Accessories") },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        console.log("Data on HomeScreen:", result.data); // Agrega este log para verificar los datos
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [successDelete]);
  

  return (
    <div>
      <Helmet>
        
        <title>MY PET SHOP</title>
      </Helmet>

      {/* Checkbox for toggling buttons */}

     

      <div className="image-container">
        <img src="https://i0.wp.com/www.russellfeedandsupply.com/wp-content/uploads/2022/01/canidae-25-off-may-23-banner-1.jpg?ssl=1" alt="promotion" />
      </div>
      <h1>Featured Categories</h1>

      <div className="category-Pets-buttons-container">
        {categoryButtonsPets.map((button, index) => (
          <button key={index} onClick={button.onClick} className="category-Pet-button">
            <div className="button-Pet-content">
              <img src={button.imageUrl} alt={button.label} />
              <span>{button.label}</span>
            </div>
          </button>
        ))}
      </div>
      <h1>Most Selled Products</h1>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products
              .filter((product) => product.status !== false)
              .map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
