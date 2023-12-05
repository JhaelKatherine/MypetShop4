import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import "../Css/homeScreen.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const FilterLogic = () => {
  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");
  const [activeCategoryButton, setActiveCategoryButton] = useState(null);
  const [activeSpeciesButton, setActiveSpeciesButton] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.trim());
    setSelectedSpecies(null);
    
    fetchProductsByCategoryAndSpecies(category.trim(), null);
    setActiveCategoryButton(category);
    setActiveSpeciesButton(null);
  };
  const forceUpdate = () => {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  };


  const handleSubCategoryClick = async (subCategory) => {
    const [category, species] = subCategory.split(' ');
  
    
  
    setSelectedCategory(category);
    setSelectedSpecies(species);
  
    try {
      const response = await axios.get(`/api/products/category/${species}/species/${category}`);
      const products = response.data;
      setFilteredProducts(products);
      setFilterApplied(products.length === 0);
      fetchProductsByCategoryAndSpecies(species, category);

    } catch (error) {
      
      if (error.response) {
        
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        
        console.error('No response received:', error.request);
      } else {
        
        console.error('Error setting up the request:', error.message);
      }
      setFilteredProducts([]);
      setFilterApplied(true);
    }
  };
  
  


  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedSpecies(null);
    setFilteredProducts([]);
    setActiveCategoryButton(null);
    setActiveSpeciesButton(null);
    setFilterApplied(false);
  };
  

  
  const fetchProductsByCategoryAndSpecies = async (category, species) => {
    setLoadingProducts(true);

    try {


      
      const filterURL = `/products?category=${category}&species=${species}`;
      navigate(filterURL);
    } catch (error) {
      console.error('Error fetching products:', error);
      setFilteredProducts([]);
      setFilterApplied(true);
      const filterURL = `/products?category=${category}&species=${species}`;
      navigate(filterURL);
    }

    setLoadingProducts(false);
  };
  
  
  
  
  
  
  

  const categoryButtons = [
    { label: "\u00A0\u00A0\u00A0\u00A0DOG\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://icones.pro/wp-content/uploads/2021/11/icone-de-chien-noir.png" },
    { label: "\u00A0\u00A0\u00A0\u00A0CAT\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://i.ibb.co/K6pnYW5/gato.png" },
    { label: " RODENTS", imageUrl: "https://i.ibb.co/qdvv97P/raton.png"},
    { label: "\u00A0\u00A0\u00A0\u00A0\u00A0BIRDS\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://i.ibb.co/YkNhK7r/pajaro.png" },
    { label: " REPTILES\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://i.ibb.co/yXRPJy2/tortuga-4.png"},
  ];

  const extractCategoryAndSpecies = (label) => {
    const [category, species] = label.split(' ');
    return { category, species };
  };
  
  const handleProductClick = (productSlug) => {
    const clickedElement = document.activeElement;
  
    if (clickedElement.classList.contains("btn-add-to-cart")) {
      
      if (productSlug) {
        navigate(`/product/${productSlug}`);
      } else {
        console.error("Product slug is undefined");
        
      }
    }
  };
  
  
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
  
  
    if (category || species) {
      
      handleSubCategoryClick(`${species} ${category}`);
    } else {
      
      handleResetFilter();
    }
  }, [location.search]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
  
 
  
    if (category || species) {
      
      handleSubCategoryClick(`${species} ${category}`);
    } else {
      
      handleResetFilter();
    }
  }, [location.search]);
  

  useEffect(() => {
    
    handleResetFilter();
  }, [location.pathname]);

  const subCategories = {
    DOG: ["DOG FOOD", "DOG SNACKS", "DOG TOYS", "DOG HYGIENE"],
    CAT: ["CAT FOOD", "CAT SNACKS", "CAT TOYS", "CAT HYGIENE"],
    RODENTS: ["RODENTS FOOD", "RODENTS SNACKS", "RODENTS TOYS", "RODENTS HYGIENE"],
    BIRDS: ["BIRDS FOOD", "BIRDS SNACKS", "BIRDS TOYS", "BIRDS HYGIENE"],
    REPTILES: ["REPTILES FOOD", "REPTILES SNACKS", "REPTILES TOYS", "REPTILES HYGIENE"],
  };
// Obtén el número total de productos y el número de productos por fila
const totalProducts = filteredProducts.length;
const productsPerRow = 4; // Ajusta según la cantidad deseada por fila

// Calcula la cantidad de filas y productos en la última fila
const rowCount = Math.ceil(totalProducts / productsPerRow);
const productsInLastRow = totalProducts % productsPerRow || productsPerRow;

  return (
    <div key={forceUpdate} className="filter-container">
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
                  style={{ width: '35px', height: '35px' }}
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
        {filterApplied ? (
          
    <p style={{ marginBottom: '490px' }}>We are sorry but there are no products in the selected category, please continue browsing for more products.</p>
    
    ) : (
      <Row>
      {filteredProducts.map((product, index) => {
        const isLastRow = Math.floor(index / productsPerRow) === rowCount - 1;
        const marginBottom = isLastRow ? '200px' : '0';
  
        return (
          <Col key={product.slug} lg={3} className="mb-3">
            <div
              onClick={() => handleProductClick(product.slug)}
              style={{
                width: '250px',
                height: '350px',
                margin: '0 auto 60px',
                marginBottom,
                marginTop: '50px',
              }}
            >
              {product.slug ? <Product product={product} /> : <p></p>}
            </div>
          </Col>
        );
      })}
    </Row>
        )}
      </div>
    </div>
  );
};

export default FilterLogic;