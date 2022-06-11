import './css/App.css';
import Navbar from './components/Navbar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './views/Shop';
import Home from './views/Home';
import Cart from './views/Cart';



function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Home />} />
        <Route children path='/shop' element={<Shop />} />
        <Route children path='/cart' element={<Cart />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
