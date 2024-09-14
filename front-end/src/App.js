import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ListProducts from './views/products/listProducts';
import Footer from './components/Footer';
import HeaderAdmin from './views/administrator/AdminHeader';
import ListProductsAdmin from './views/products/listProductsAdmin';
import { CartProvider } from './context/CartContext'; // Importa CartProvider

// Componente para decidir cuál Header mostrar
function HeaderSwitcher() {
  const location = useLocation();
  console.log('Ruta actual:', location.pathname); // Confirmar ruta actual

  // Prueba simplificada
  if (location.pathname.startsWith('/administrator')) {
    return <HeaderAdmin />;
  }
  return <Header />;
}

// Componente de error básico
function ErrorPage() {
  return <h1>Page Not Found</h1>;
}

function App() {
  return (
    <>
      <div className="preloader-wrapper">
        <div className="preloader"></div>
      </div>
      <HeaderSwitcher />
      
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/products/list" element={<ListProducts />} />
        <Route path="/administrator/dashboard" element={<ListProducts />} />
        <Route path="/administrator/products" element={<ListProductsAdmin />} />
        <Route path="*" element={<ErrorPage />} /> {/* Ruta para manejar errores 404 */}
      </Routes>
      
      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <CartProvider> 
        <App />
      </CartProvider>
    </Router>
  );
}

export default AppWrapper;
