import React, { useContext,useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import SignupScreen from './screens/SignupScreen';
import AddProductScreen from './screens/AddProductScreen'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SearchBar from './components/search/SearchBar';
import CartScreen from './screens/CartScreen';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import './App.css';
import "./Css/homeScreen.css";
import "./Css/Footer.css";
import CheckoutPage from './screens/CheckoutPage';
import AboutUs from "./components/AboutUs";
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProtectedRoute from './components/ProtectedRoute';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProductsScreen from './screens/ProductScreen';
import FilterLogic from "./screens/FilterLogic"; 
import Invoice from "./screens/Invoice";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [forceFilterUpdate, setForceFilterUpdate] = useState(false); 
  const [showCartMenu, setShowCartMenu] = useState(false);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    setShowCartButton(cart.cartItems.length > 0);
  }, [cart.cartItems]);

  const toggleCartMenu = () => {
    setShowCartMenu(!showCartMenu); 
    if (!showCartMenu) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    setShowCartButton(cart.cartItems.length > 0);
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    setShowCartButton(cart.cartItems.length - 1 > 0); 
  };

  const closeCartMenu = () => {
    setShowCartMenu(false);
    document.body.classList.remove('disable-scroll');
  };

  const [showCartButton, setShowCartButton] = useState(true);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/';
  };

  const [buttonContainerColor, setButtonContainerColor] = useState("#4180AB");

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

  const Footer = () => {
    const openSocialMedia = (socialMedia) => {

      let url = '';
      switch (socialMedia) {
        case 'instagram':
          url = 'https://www.instagram.com/petshopcorp7/';
          break;
        case 'tiktok':
          url = 'https://www.tiktok.com/@my_pet_shop023';
          break;
        case 'facebook':
          url = 'https://www.facebook.com/profile.php?id=61550120834894';
          break;

        default:
          url = '';
      }
      window.open(url, '_blank'); 
    };
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="left-section">
            <div className="logo">
              <img
                alt="My Pet Shop Logo"
                src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png"
                height="50"
                className="d-inline-block align-top"
              />
            </div>
            <div className="follow-us">
              <p>FOLLOW US ON:</p>
              <div className="social-icons">
              <a href="#" onClick={() => openSocialMedia('instagram')}>
                <img
                  alt="Instagram"
                  src="https://i.ibb.co/bJdCgX7/instagram-Icon.png"
                  className="social-icon"
                />
              </a>
              <a href="#" onClick={() => openSocialMedia('tiktok')}>
                <img
                  alt="Tiktok"
                  src="https://i.ibb.co/x89mcW1/tiktokk-Icon.png"
                  className="social-icon"
                />
              </a>
              <a href="#" onClick={() => openSocialMedia('facebook')}>
                <img
                  alt="Facebook"
                  src="https://i.ibb.co/zsVxMJJ/facebook-Icon.png"
                  className="social-icon"
                />
              </a>
                {/* Otros íconos... */}
              </div>
            </div>
          </div>
          <div className="center-section">
            <div className="buy-with-us">
              <p style={{ color: 'black' }}>BUY WITH US:</p>
              <ul className="product-list">
                <li>Dog Food</li>
                <li>Cat Food</li>
                <li>Rodents Food</li>
              </ul>
            </div>
          </div>
          <div className="right-section">
            <div className="any-questions">
              <p style={{ color: 'black' }}>ANY QUESTIONS?</p>
              <ul className="additional-links">
                <li>
                <Link to="/aboutUs" style={{ textDecoration: 'none', color: 'inherit' }}>
                  About us
                </Link>
                </li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };


  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    alt="My Pet Shop Logo"
                    src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png"
                    height="50"
                    className="d-inline-block align-top"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="mx-auto" style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
                <SearchBar />
              </Nav>
              <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/aboutUs" className="nav-link">
                      <img
                          alt="cart"
                          src="https://cdn-icons-png.flaticon.com/512/43/43921.png"
                          height="30"
                          className="d-inline-block align-top"
                      />
                  </Link>

                  <button className="cart-button" onClick={toggleCartMenu}>
          <img
            alt="cart"
            src="https://i.ibb.co/ThQrF5g/shopping-Cart-Icon-1.png"
            height="30"
            className="d-inline-block align-top"
          />
          {cart.cartItems.length > 0 && (
            <Badge pill bg="danger">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
          )}
        </button>
        {/* Menú desplegable */}
        {showCartMenu && (
          
          <div className={`cart-menu-right ${showCartMenu ? 'show' : ''}`}>
            <div className="overlay" onClick={closeCartMenu}></div>
            <div className="cart-menu-content">
              <span className= "text-up" >Your shopping cart</span>
              <span onClick={closeCartMenu} className="close-cart">
                X
              </span>
              

              {/* Condición para mostrar el contenido del carrito o el mensaje */}
              {cartItems.length === 0 ? (
                <div style={{ marginTop: '400px' }}>No products have been added to your cart yet.</div>
              ) : (
                
                <div className="cart-items-container">
                  
                  
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      {/* Resto del código para mostrar cada elemento */}
                      <div className="cart-item-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image img-fluid rounded img-thumbnail"
                  />
                  <div className="cart-item-description">
                    <strong>{item.name}</strong>
                    
                    <p>{"$"+item.price}</p>
                    <div className="cart-item-buttons">
                    <Button
                      onClick={() =>
                        updateCartHandler(item, item.quantity - 1)
                      }
                      variant="light"
                      disabled={item.quantity === 1}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </Button>{' '}
                    <span>{item.quantity}</span>{' '}
                    <Button
                      variant="light"
                      onClick={() =>
                        updateCartHandler(item, item.quantity + 1)
                      }
                      disabled={item.quantity === item.countInStock}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </Button>
                    <Button
                      onClick={() => removeItemHandler(item)}
                      variant="light"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                  </div>
                  <div> ${item.quantity * item.price}</div>
                </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                
              </div>
              
              )}
              {showCartButton && (
                
                <div className="bottom-cart-button">
                  <div className="line-container">
                    <div className="line"></div>
                  </div>
                  <div className="subtotal">
                    Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </div>
                  <Link to="/cart" className="button-margin">
                  <Button variant="primary" className="button-margin" onClick={closeCartMenu} >Chekout</Button>
                  </Link>
                </div>
              )}
             
            </div>
          </div>
        )}
                {userInfo ? (
  <NavDropdown
    title={
      <>
        <img
          src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
          alt="Profile"
          height="30"
          className="d-inline-block align-top"
        />
        <span className="d-inline-block align-top ml-2">{userInfo.userName}</span>
      </>
    }
    className="d-inline-block align-top"
    id="basic-nav-dropdown"
  >
    {!userInfo.isAdmin && (
      <LinkContainer to="/orderhistory">
        <NavDropdown.Item>Order History</NavDropdown.Item>
      </LinkContainer>
    )}
    {userInfo.isAdmin && (
      <LinkContainer to="/admin/products">
        <NavDropdown.Item >
          Products
        </NavDropdown.Item>
      </LinkContainer>
    )}
    <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
  </NavDropdown>
) : (
  <LinkContainer to="/signin">
    <Nav.Link>
      <img
        alt="signin"
        src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
        height="30"
        className="d-inline-block align-top"
      />
    </Nav.Link>
  </LinkContainer>
)}

              </Nav>
            </Container>
            
          </Navbar>
          <FilterLogic/>
        </header>
        
        
        <div>
          <Nav className="flex-column text-white w-100 p-2">
          </Nav>
        </div>
        <main>
        <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/checkoutpage" element={<CheckoutPage />} />

              

                <Route path="/aboutUs" element={<AboutUs />} />

                <Route path="/invoice" element={<Invoice />} />

              <Route path="/" element={<HomeScreen />} />

              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
             <Route path="/addproduct" element=
             {
              <AdminRoute>
                  <AddProductScreen />
               </AdminRoute>
             } 
             />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>

                            <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>

            </Routes>

          </Container>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
