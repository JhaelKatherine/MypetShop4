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
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  const loadBrands = async () => {
    try {
      const response = await axios.get(`/api/brands/animal/${selectedCategory}/category/${selectedSpecies}/brands`);
      const brandsData = response.data;
      console.log("selectedSpecies : ", selectedSpecies);
      console.log("Category :", selectedCategory);
      setAvailableBrands(brandsData);
      
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleBrandChange = (brand) => {
    const index = selectedBrands.indexOf(brand);
    let updatedSelectedBrands = [...selectedBrands];
  
    if (index === -1) {
      console.log("Me estoy activando");
      updatedSelectedBrands = [...selectedBrands, brand];
      
    } else {
      console.log("Me estoy desactivando");
      updatedSelectedBrands.splice(index, 1);
      
    }
    if (filteredProducts.length > 0) {
      fetchAllProducts();
      applyBrandFilter();
    }
    
    
  };

  


  const handleResetBrands= () => {
      setSelectedBrands([]);
      applyBrandFilter();
  }
  useEffect(() => {
    
    if (selectedSpecies && selectedCategory) {
      loadBrands();
      setSelectedBrands([]); 
    }
  }, [selectedSpecies, selectedCategory]);

  useEffect(() => {
    
    console.log("Brands Seleccionados actualizados:", selectedBrands);

}, [selectedBrands]);

useEffect(() => {
  
  if (availableBrands.length > 0) {
    if (selectedBrands.length > 0) {
      const filteredProductsByBrands = filteredProducts.filter(product =>
        selectedBrands.includes(product.brand)
      );
      setFilteredProducts(filteredProductsByBrands);
    } else {
      
    }
  }
}, [selectedBrands]);


const applyBrandFilter = () => {
  if (selectedBrands.length > 0) {
    console.log("Se esta aplicando el applyBrandFilter");
    const filteredProductsByBrands = filteredProducts.filter(product =>
      selectedBrands.includes(product.brand)
    );
    setFilteredProducts(filteredProductsByBrands);
  }
  
};

const fetchAllProducts = async () => {
  console.log("Fetcheando los productos");
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
    console.log("categoy : ",category);
    console.log("species : ",species );
  try {
    const response = await axios.get(`/api/products/category/${species}/species/${category}`);
    const products = response.data;
    setFilteredProducts(products);
    setFilterApplied(products.length === 0);
      fetchProductsByCategoryAndSpecies(species, category);
  } catch (error) {
    console.error('Error fetching all products:', error);
    setFilteredProducts([]);
  }
};

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
      
      handleSubCategoryClick(`${species} ${category}`);
    } else {
      
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
            
{filteredProducts
    .filter(product => availableBrands.length !== 0 || availableBrands.includes(product.brand))
     .map((product) => (
              <Col key={product.slug} lg={3} className="mb-3">
                <div
                  onClick={() => handleProductClick(product.slug)}
                  style={{
                    
                    width: '250px', 
                    height: '350px', 
                    margin: '0 auto 60px', 
                  
                  }}
                >
                  {product.slug ? <Product product={product} /> : <p></p>}
                  
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div>
        <button onClick={handleResetBrands}>Clear All</button>
        <h3>Brands:</h3>
        
        {availableBrands.map((brand) => (
          <div key={brand}>
            <input
              type="checkbox"
              id={brand}
              name={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default FilterLogic;
