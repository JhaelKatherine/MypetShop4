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

  const categoryButtonsPets = [
    { label: "Dog Food", imageUrl: "https://images.ecestaticos.com/RYyHCyWe7IE6v1LNdx-ud8zj-KM=/0x0:2121x1414/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd67%2Fa8d%2F860%2Fd67a8d8604edeac49386e96e2890fe7a.jpg", onClick: () => console.log("Acción para Dog Food") },
    { label: "Cat Food", imageUrl: "https://laverdadnoticias.com/__export/1679601873554/sites/laverdad/img/2023/03/23/mishicomiendo.jpg_1953115887.jpg", onClick: () => console.log("Acción para Cat Food") },
    { label: "Dog Accessories", imageUrl: "https://img.freepik.com/fotos-premium/cumpleanos-animales-lindos_759095-115240.jpg", onClick: () => console.log("Acción para Dog Accessories") },
    { label: "Cat Litter", imageUrl: "https://s.alicdn.com/@sc04/kf/H8494b319e9de4996845a361b9758d82et.jpg", onClick: () => console.log("Acción para Cat Litter") },
    { label: "Cat Accessories", imageUrl: "https://us.123rf.com/450wm/colnihko/colnihko2306/colnihko230600052/205883575-cute-fluffy-cat-celebrates-birthday-in-cap-on-festive-balloons-background-generative-ai-illustration.jpg?ver=6", onClick: () => console.log("Acción para Cat Accessories") },
  ];

  const handleButtonClick = (color) => {
    setButtonContainerColor(color);
  };

  return (
    <div>
      <Helmet>
        <title>MY PET SHOP</title>
      </Helmet>

      {/* Checkbox for toggling buttons */}

      {/* Button container inside the label for the checkbox */}
      <label htmlFor="toggleButtons" className="button-container" style={{ backgroundColor: buttonContainerColor }}>
      {categoryButtons.map((button, index) => (
  <button key={index} onClick={() => handleButtonClick("#4180AB")} className="image-button">
    <div className="button-content">
      <img src={button.imageUrl} alt={button.label} />
      <span style={{ marginBottom: '5px' }}>{button.label}</span>
    </div>
  </button>
))}


      </label>

      <div className="image-container">
      <img src="https://i0.wp.com/www.russellfeedandsupply.com/wp-content/uploads/2022/01/canidae-25-off-may-23-banner-1.jpg?ssl=1" alt="promotion" />
      {/* Agrega más imágenes según sea necesario */}
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
