import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import "../Css/homeScreen.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const FilterLogic = ({ forceUpdate }) => {
  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");
  const [activeButton, setActiveButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState({ category: null, subCategory: null });
  const location = useLocation();

  const handleButtonClick = (label) => {
    setActiveButton((prevLabel) => (prevLabel === label ? null : label));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.trim());
    setSelectedSubCategory(null);
    fetchProductsByCategoryAndSpecies(category.trim(), selectedSubCategory);
  };
  
  const handleResetFilter = () => {
    // Realiza las acciones necesarias para reiniciar el filtro
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setFilteredProducts([]);
  };
  useEffect(() => {
    // Verificar si la ubicación actual NO contiene información de búsqueda
    const noSearchInfo = !location.search.includes("category=") && !location.search.includes("subCategory=");

    // Si NO hay información de búsqueda, realizar el reinicio del filtro
    if (noSearchInfo) {
      handleResetFilter();
    }
  }, [location.search]);
  
  const handleSubCategoryClick = async (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchProductsByCategoryAndSpecies(selectedCategory, subCategory);
  };
  const fetchProductsByCategoryAndSpecies = async (category, species) => {
    try {
      const response = await axios.get(`/api/products/category/${category}/species/${species}`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    navigate(`/products?category=${category}&species=${species}`);
  };
  const fetchProductsByCategory = async (category, subCategory) => {
    try {
      const response = await axios.get(`/api/products/category/${category}/${subCategory}`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  


const categoryButtons = [
    { label: "\u00A0\u00A0\u00A0\u00A0DOG\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/91/91544.png", onClick: () => console.log("Filtrar por gato") },
    { label: "\u00A0\u00A0\u00A0\u00A0CAT\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn.icon-icons.com/icons2/2242/PNG/512/gato_icon_134883.png", onClick: () => console.log("Filtrar por perro") },
    { label: " RODENTS", imageUrl: "https://cdn-icons-png.flaticon.com/512/1905/1905235.png", onClick: () => console.log("Filtrar por ave") },
    { label: "\u00A0\u00A0\u00A0\u00A0\u00A0BIRDS\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/6622/6622649.png", onClick: () => console.log("Filtrar por reptil") },
    { label: " REPTILES\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/2809/2809783.png", onClick: () => console.log("Filtrar por roedores") },
  ];

  const subCategories = {
    DOG: ["DOG FOOD", "DOG SNACKS", "DOG TOYS", "DOG HYGIENE"],
    CAT: ["CAT FOOD", "CAT SNACKS", "CAT TOYS", "CAT HYGIENE"],
    RODENTS: ["RODENT FOOD", "RODENT SNACKS", "RODENT TOYS", "RODENT HYGIENE"],
    BIRDS: ["BIRD FOOD", "BIRD SNACKS", "BIRD TOYS", "BIRD HYGIENE"],
    REPTILES: ["REPTILE FOOD", "REPTILE SNACKS", "REPTILE TOYS", "REPTILE HYGIENE"],
  };

  return (
    <div key={forceUpdate}>
      <label
        htmlFor="toggleButtons"
        className="button-container"
        style={{ backgroundColor: buttonContainerColor }}
        onMouseLeave={() => setActiveButton(null)}
      >
        {categoryButtons.map((button, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveButton(button.label)}
            className={`image-button ${activeButton === button.label ? "focused" : ""}`}
          >
            <button
              onClick={() => {
                handleButtonClick(button.label);
                handleCategoryClick(button.label.trim());
              }}
              className="original-button"
            >
              <div className="button-content">
                <img
                  src={button.imageUrl}
                  alt={button.label}
                  style={{ width: '50px', height: '50px' }}
                />
                <span style={{ marginBottom: '5px' }}>{button.label}</span>
              </div>
            </button>
            {activeButton === button.label && (
              <div className="subcategories">
                {subCategories[button.label.trim()].map((subCategory, subIndex) => (
                  <button
                    key={subIndex}
                    className="subcategory-button"
                    onClick={() => {
                      handleSubCategoryClick(subCategory);
                    }}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </label>
      <div className="products">
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FilterLogic;