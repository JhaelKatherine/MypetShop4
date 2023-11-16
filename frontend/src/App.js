import React, { useContext } from 'react';
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
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import Badge from 'react-bootstrap/Badge';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import './App.css';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

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
                    height="70"
                    className="d-inline-block align-top"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="mx-auto" style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
                <SearchBox />
              </Nav>
              <Nav className="me-auto  w-100  justify-content-end">
              <Link to="/addproduct" className="nav-link">
                  <img
                    alt="addProduct"
                    src="https://i.ibb.co/VpttTSt/add1-removebg-preview.png"
                    height="50"
                    className="d-inline-block align-top"
                  />
                </Link>
                <Link to="/cart" className="nav-link">
                  <img
                    alt="cart"
                    src="https://i.ibb.co/ThQrF5g/shopping-Cart-Icon-1.png"
                    height="50"
                    className="d-inline-block align-top"
                  />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                <LinkContainer to="/signup">
                  <Nav.Link>
                    <img
                      alt="signup"
                      src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
                      height="50"
                      className="d-inline-block align-top"
                    />
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <div>
          <Nav className="flex-column text-white w-100 p-2">
            {/* Puedes agregar elementos aquí si es necesario */}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignupScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/addproduct" element={<AddProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route
path="/shipping"
element={<ShippingAddressScreen />}
></Route>
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
