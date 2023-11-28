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
import CheckoutPage from './screens/CheckoutPage';
import AboutUs from "./components/AboutUs";
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProtectedRoute from './components/ProtectedRoute';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Invoice from "./screens/Invoice";


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/';
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

                <Link to="/cart" className="nav-link">
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
                </Link>
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
    <LinkContainer to="/orderhistory">
      <NavDropdown.Item>Order History</NavDropdown.Item>
    </LinkContainer>
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



 <NavDropdown title={<img src="https://cdn-icons-png.flaticon.com/512/78/78948.png"  alt="Admin" className="admin-image" />} id="admin-nav-dropdown">
 <LinkContainer to="/admin/products">
    <NavDropdown.Item className="nav-dropdown-item">
    <img src="https://cdn-icons-png.flaticon.com/512/4689/4689790.png" alt="Icono de Producto" className="product-icon" />
       Products 
    </NavDropdown.Item>
  </LinkContainer>
</NavDropdown>
              </Nav>
            </Container>
          </Navbar>
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
              <Route path="/addproduct" element={<AddProductScreen />} />
              <Route path="/checkoutpage" element={<CheckoutPage />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/aboutUs" element={<AboutUs />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
