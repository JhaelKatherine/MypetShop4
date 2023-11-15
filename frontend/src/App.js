import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SearchBox from './components/SearchBox';

import './App.css';

function App() {


  return (
    <BrowserRouter>
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img
                alt="My Pet Shop Logo"
                src="https://www.mypetshop.co.za/wp-content/uploads/2019/11/My-petshop-LOGO.png"
                height="70"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>

<Nav className="mx-auto" style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
  <SearchBox />
</Nav>
<Nav className="ml-auto align-items-center">
            <img
              alt="cart"
              src="https://i.ibb.co/ThQrF5g/shopping-Cart-Icon-1.png"
              height="50"
              className="d-inline-block align-top mr-2"
              style={{ marginRight: '25px' }}
            />
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
