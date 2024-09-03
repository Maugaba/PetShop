import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ListProducts from './views/products/listProducts';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/products/list" element={<ListProducts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
