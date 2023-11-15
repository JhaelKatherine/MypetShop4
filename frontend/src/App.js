import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';

import SignupScreen from './screens/SignupScreen';

import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';

import './App.css';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;


  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);


  return (
    <BrowserRouter>
      <div

      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar >
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
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <img
            alt="cart"
            src="https://i.ibb.co/ThQrF5g/shopping-Cart-Icon-1.png"
            height="50"
            className="d-inline-block align-top"
            />
            {/* Mostrar siempre el enlace de inicio de sesión */}
            <Link className="nav-link" to="/signin">
              <img
                alt="signin"
                src="https://i.ibb.co/PMQ1s9X/imagen-de-perfil.png"
                height="50"
                className="d-inline-block align-top"
              />
            </Link>
          </Nav>
        </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div

        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>

          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/signin" element={<SignupScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
