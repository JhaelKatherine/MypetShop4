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
  const [filterApplied, setFilterApplied] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.trim());
    setSelectedSpecies(null);
    // Actualiza para llamar a la nueva función
    fetchProductsByCategoryAndSpecies(category.trim(), null);
    setActiveCategoryButton(category);
    setActiveSpeciesButton(null);
  };
  const forceUpdate = () => {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  };


  const handleSubCategoryClick = async (subCategory) => {
    const [category, species] = subCategory.split(' ');
  
    // Antes de llamar a axios.get, inicia la actualización de la URL
  
    setSelectedCategory(category);
    setSelectedSpecies(species);
  
    try {
      const response = await axios.get(`/api/products/category/${species}/species/${category}`);
      const products = response.data;
      setFilteredProducts(products);
      setFilterApplied(products.length === 0);
      fetchProductsByCategoryAndSpecies(species, category);

    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un estado de error
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error('No response received:', error.request);
      } else {
        // Algo sucedió en la configuración de la solicitud que generó un error
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


      // Construir la URL basada en los parámetros de filtro
      const filterURL = `/products?category=${category}&species=${species}`;
      console.log('filterURL:', filterURL);

      // Navegar a la nueva URL sin recargar la página
      navigate(filterURL);

      console.log('Después de navigate');
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
    { label: "\u00A0\u00A0\u00A0\u00A0DOG\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/91/91544.png" },
    { label: "\u00A0\u00A0\u00A0\u00A0CAT\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn.icon-icons.com/icons2/2242/PNG/512/gato_icon_134883.png" },
    { label: " RODENTS", imageUrl: "https://cdn-icons-png.flaticon.com/512/1905/1905235.png"},
    { label: "\u00A0\u00A0\u00A0\u00A0\u00A0BIRDS\u00A0\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/6622/6622649.png" },
    { label: " REPTILES\u00A0\u00A0\u00A0\u00A0", imageUrl: "https://cdn-icons-png.flaticon.com/512/2809/2809783.png"},
  ];

  const extractCategoryAndSpecies = (label) => {
    const [category, species] = label.split(' ');
    return { category, species };
  };
  
  const handleProductClick = (productSlug) => {
    const clickedElement = document.activeElement;
  
    if (clickedElement.classList.contains("btn-add-to-cart")) {
      // Redirige solo si el clic no proviene del botón "Add to cart"
      if (productSlug) {
        navigate(`/product/${productSlug}`);
      } else {
        console.error("Product slug is undefined");
        // Puedes elegir realizar alguna acción o simplemente no hacer nada
      }
    }
  };
  
  
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
  
    console.log('useEffect - category:', category, 'species:', species);
  
    if (category || species) {
      // Filtrar productos cuando la URL tenga parámetros de filtro
      handleSubCategoryClick(`${species} ${category}`);
    } else {
      // En caso contrario, resetear los filtros
      handleResetFilter();
    }
  }, [location.search]);
  
  
  

  useEffect(() => {
    // Limpiar filtros y productos cuando cambie la ruta
    handleResetFilter();
  }, [location.pathname]);

  const subCategories = {
    DOG: ["DOG FOOD", "DOG SNACKS", "DOG TOYS", "DOG HYGIENE"],
    CAT: ["CAT FOOD", "CAT SNACKS", "CAT TOYS", "CAT HYGIENE"],
    RODENTS: ["RODENTS FOOD", "RODENTS SNACKS", "RODENTS TOYS", "RODENTS HYGIENE"],
    BIRDS: ["BIRDS FOOD", "BIRDS SNACKS", "BIRDS TOYS", "BIRDS HYGIENE"],
    REPTILES: ["REPTILES FOOD", "REPTILES SNACKS", "REPTILES TOYS", "REPTILES HYGIENE"],
  };

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
        {filterApplied ? (
    <p>We are sorry but there are no products in the selected category, please continue browsing for more products.</p>
    ) : (
          <Row>
            
{filteredProducts.map((product) => (
              <Col key={product.slug} lg={3} className="mb-3">
                <div
                  onClick={() => handleProductClick(product.slug)}
                  style={{
                    // Aplica estilos de tamaño al div que contiene cada producto
                    width: '250px', // Puedes ajustar según tus necesidades
                    height: '350px', // Puedes ajustar según tus necesidades
                    margin: '0 auto 60px', // Puedes ajustar según tus necesidades
                  
                  }}
                >
                  {product.slug ? <Product product={product} /> : <p></p>}
                  
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default FilterLogic;
