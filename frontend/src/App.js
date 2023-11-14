import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';

import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';

import './App.css';

function App() {



  return (
    <BrowserRouter>
      
          

              <Route path="/" element={<HomeScreen />} />
           
       
       
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      
    </BrowserRouter>
  );
}

export default App;