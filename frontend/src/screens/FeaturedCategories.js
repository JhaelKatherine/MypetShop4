import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import "../Css/homeScreen.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FilterLogic from "./FilterLogic"; 


const FeaturedCategories= () => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [filterApplied, setFilterApplied] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const species = params.get("species");
  
    if (category || species) {
      handleSubCategoryClick(`${species} ${category}`);
    } else {
    }
  }, [location.search]);

  const handleSubCategoryClick = async (subCategory) => {
    const [category, species] = subCategory.split(' ');

    setSelectedCategory(category);
    setSelectedSpecies(species);
  
    try {
      const response = await axios.get(`/api/products/category/${species}/species/${category}`);
      const products = response.data;
      setFilteredProducts(products);
     
    } catch (error) {
        setFilterApplied(true)
      console.error('Error fetching products:', error);
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
    }
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

  return (
    <div className="filter-container">
         
        <Row>
            
{filteredProducts.map((product) => (
              <Col key={product.slug} lg={3} className="mb-3">
                <div
                  onClick={() => handleProductClick(product.slug)}
                  style={{
                   
                    width: '250px', 
                    height: '350px', 
                    margin: '0 auto 60px',
                    marginBottom: '300px',
                    marginTop: '50px',
                  }}
                >
                  {product.slug ? <Product product={product} /> : <p></p>}
                  
                </div>
              </Col>
            ))}
          </Row>
          
    </div>
  );
};

export default FeaturedCategories;