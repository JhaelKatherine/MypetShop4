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
import SigninScreen from './screens/SigninScreen';
import './App.css';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
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
                {userInfo ? (
  <NavDropdown
    title={
      <>
        <img
          src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
          alt="Profile"
          height="50"
          className="d-inline-block align-top"
        />{' '}
        {userInfo.name}
      </>
    }
    className="d-inline-block align-top"
    id="basic-nav-dropdown"
  >
    <LinkContainer to="">
      <NavDropdown.Item>User Profile</NavDropdown.Item>
    </LinkContainer>
    <LinkContainer to="">
      <NavDropdown.Item>Order History</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Divider />
    <Link
      className="dropdown-item"
      to="#signout"
      onClick={signoutHandler}
    >
      Sign Out
    </Link>
  </NavDropdown>
) : (
  <LinkContainer to="/signin">
    <Nav.Link>
      <img
        alt="signin"
        src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
        height="50"
        className="d-inline-block align-top"
      />
    </Nav.Link>
  </LinkContainer>
)}

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
              <Route path="/signin" element={<SigninScreen />} />
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
