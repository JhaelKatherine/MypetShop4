import React, { useState } from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../Css/homeScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
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

  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const categoryButtons = [
    { label: " DOG", imageUrl: "https://cdn-icons-png.flaticon.com/512/91/91544.png", onClick: () => console.log("Filtrar por gato") },
    { label: " CAT", imageUrl: "https://cdn.icon-icons.com/icons2/2242/PNG/512/gato_icon_134883.png", onClick: () => console.log("Filtrar por perro") },
    { label: " RODENTS", imageUrl: "https://cdn-icons-png.flaticon.com/512/1905/1905235.png", onClick: () => console.log("Filtrar por ave") },
    { label: " BIRDS", imageUrl: "https://cdn-icons-png.flaticon.com/512/6622/6622649.png", onClick: () => console.log("Filtrar por reptil") },
    { label: " REPTILES", imageUrl: "https://cdn-icons-png.flaticon.com/512/2809/2809783.png", onClick: () => console.log("Filtrar por roedores") },
  ];

  const handleButtonClick = (color) => {
    setButtonContainerColor(color);
  };

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>

      {/* Checkbox for toggling buttons */}

      {/* Button container inside the label for the checkbox */}
      <label htmlFor="toggleButtons" className="button-container" style={{ backgroundColor: buttonContainerColor }}>
      {categoryButtons.map((button, index) => (
  <button key={index} onClick={() => handleButtonClick("#4CAF50")} className="image-button">
    <div className="button-content">
      <img src={button.imageUrl} alt={button.label} />
      <span style={{ marginBottom: '5px' }}>{button.label}</span>
    </div>
  </button>
))}


      </label>

      <div className="image-container">
      <img src="https://coderi.mx/wp-content/uploads/slider2/Banner_Latas1.jpeg" alt="promotion" />
      {/* Agrega más imágenes según sea necesario */}
    </div>

      <h1>Featured Products</h1>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
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
