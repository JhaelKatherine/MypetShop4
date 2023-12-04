import React, { useState, useEffect, useReducer} from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://i0.wp.com/www.russellfeedandsupply.com/wp-content/uploads/2022/01/canidae-25-off-may-23-banner-1.jpg?ssl=1',
    'https://globalpetfoods.com/wp-content/uploads/2021/10/MicrosoftTeams-image-16-1024x365.png?_t=1636729969',
    'https://cdn.shoplightspeed.com/shops/614283/files/33298133/primal-freeze-dried-raw-dog-cat-food.jpg',

  ];
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  const navigatelink = useNavigate();
  const [successDelete, setSuccessDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");

  const categoryButtonsPets = [
    { label: "DOG FOOD", imageUrl: "https://images.ecestaticos.com/RYyHCyWe7IE6v1LNdx-ud8zj-KM=/0x0:2121x1414/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd67%2Fa8d%2F860%2Fd67a8d8604edeac49386e96e2890fe7a.jpg", onClick: () => console.log("Acción para Dog Food") },
    { label: "CAT FOOD", imageUrl: "https://laverdadnoticias.com/__export/1679601873554/sites/laverdad/img/2023/03/23/mishicomiendo.jpg_1953115887.jpg", onClick: () => console.log("Acción para Cat Food") },
    { label: "RODENTS FOOD", imageUrl: "https://www.tierpark-berlin.de/fileadmin/_processed_/e/1/csm_Feldhamster_16zu9_9b99387161.jpg", onClick: () => console.log("Acción para Dog Accessories") },
    { label: "BIRDS FOOD", imageUrl: "https://www.stodels.com/wp-content/uploads/2014/10/Stodels-Blogpost-feeding-tips-for-birds-940x705-2023.jpg", onClick: () => console.log("Acción para Cat Litter") },
    { label: "REPTILES", imageUrl: "https://www.jabberwockreptiles.com/wp-content/uploads/2022/01/Reptiles-Favorite-Food.jpg", onClick: () => console.log("Acción para Cat Accessories") },
  ];

  const handleSubCategoryClick = async (category, species) => {
   
    try {
      navigatelink(`/featured?category=${category}&species=${species}`);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
    
  };

  const navigate = useNavigate();
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
  }, [successDelete]);
  
  useEffect(() => {
    const intervalId = setInterval(changeImage, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImageIndex]);

  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  return (
    <div>
      <Helmet>
        
        <title>MY PET SHOP</title>
      </Helmet>

     

     

      <div className="image-container">
        <img src={images[currentImageIndex]} alt="promotion" />
      </div>
      <h1>Featured Categories</h1>

      <div className="category-Pets-buttons-container">
        {categoryButtonsPets.map((button, index) => (
        <button key={index} onClick={() => handleSubCategoryClick('FOOD', button.label.split(' ')[0])} className="category-Pet-button">
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