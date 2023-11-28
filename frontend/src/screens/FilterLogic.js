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
  const [activeCategoryButton, setActiveCategoryButton] = useState(null);
  const [activeSpeciesButton, setActiveSpeciesButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.trim());
    setSelectedSpecies(null);
    fetchProductsByCategoryAndSpecies(category.trim(), null);
    setActiveCategoryButton(category);
    setActiveSpeciesButton(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    const [category, species] = subCategory.split(' ');
    setSelectedCategory(category);
    setSelectedSpecies(species);
    fetchProductsByCategoryAndSpecies(species, category);
    setActiveSpeciesButton(subCategory);
  };



  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedSpecies(null);
    setFilteredProducts([]);
    setActiveCategoryButton(null);
    setActiveSpeciesButton(null);
    setFilterApplied(false); // Reiniciar el estado al quitar el filtro
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
  
    if (category && species) {
      handleSubCategoryClick(`${species} ${category}`);
    } else if (category) {
      handleCategoryClick(category);
    } else {
      handleResetFilter();
    }
  }, [location.search]);
  

  const fetchProductsByCategoryAndSpecies = async (category, species) => {
    try {
      const response = await axios.get(`/api/products/category/${category}/species/${species}`);
      const products = response.data;
      setFilteredProducts(products);
      setFilterApplied(products.length === 0); // Establecer el estado según si hay coincidencias
    } catch (error) {
      console.error('Error fetching products:', error);
      setFilteredProducts([]);
      setFilterApplied(true); // Establecer el estado en true en caso de error
    }

    navigate(`/products?category=${category}&species=${species}`);
  };

  const categoryButtons = [
    { label: "\u00A0\u00A0\u00A0\u00A0DOG\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/91/91544.png", onClick: () => handleCategoryClick("DOG") },
    { label: "\u00A0\u00A0\u00A0\u00A0CAT\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn.icon-icons.com/icons2/2242/PNG/512/gato_icon_134883.png", onClick: () => handleCategoryClick("CAT") },
    { label: " RODENTS", imageUrl: "https://cdn-icons-png.flaticon.com/512/1905/1905235.png", onClick: () => handleCategoryClick("RODENTS") },
    { label: "\u00A0\u00A0\u00A0\u00A0\u00A0BIRDS\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/6622/6622649.png", onClick: () => handleCategoryClick("BIRDS") },
    { label: " REPTILES\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/2809/2809783.png", onClick: () => handleCategoryClick("REPTILES") },
  ];

  const extractCategoryAndSpecies = (label) => {
    const [category, species] = label.split(' ');
    return { category, species };
  };

  const subCategories = {
    DOG: ["DOG FOOD", "DOG SNACKS", "DOG TOYS", "DOG HYGIENE"],
    CAT: ["CAT FOOD", "CAT SNACKS", "CAT TOYS", "CAT HYGIENE"],
    RODENTS: ["RODENT FOOD", "RODENT SNACKS", "RODENT TOYS", "RODENT HYGIENE"],
    BIRDS: ["BIRD FOOD", "BIRD SNACKS", "BIRD TOYS", "BIRD HYGIENE"],
    REPTILES: ["REPTILES FOOD", "REPTILES SNACKS", "REPTILES TOYS", "REPTILES HYGIENE"],
  };

  return (
    <div key={forceUpdate}>
      <label
        htmlFor="toggleButtons"
        className="button-container"
        style={{ backgroundColor: buttonContainerColor }}
        onMouseLeave={() => {
          setActiveCategoryButton(null);
          setActiveSpeciesButton(null);
        }}
      >
        {categoryButtons.map((button, index) => (
          <div
            key={index}
            onMouseEnter={() => {
              setActiveCategoryButton(button.label);
              setActiveSpeciesButton(null);
            }}
            className={`image-button ${activeCategoryButton === button.label ? "focused" : ""}`}
          >
            <button
              onClick={() => {
                button.onClick();
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
            {activeCategoryButton === button.label && (
              <div className="subcategories">
                {subCategories[button.label.trim()].map((subCategory, subIndex) => (
                  <button
                    key={subIndex}
                    className={`subcategory-button ${activeSpeciesButton === subCategory ? "focused" : ""}`}
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
        {filterApplied && filteredProducts.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default FilterLogic;
