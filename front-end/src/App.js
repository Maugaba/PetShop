import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ListProducts from './views/products/listProducts';
import Footer from './components/Footer';
import HeaderAdmin from './views/administrator/AdminHeader';
import ListProductsAdmin from './views/products/listProductsAdmin';
import { CartProvider } from './context/CartContext'; 

import ListCouponsAdmin from './views/coupons/listCouponsAdmin';
import ListCategoriesAdmin from './views/categories/listCategoriesAdmin'; 
import AboutUs from './views/about/about';
import ContactUs from './views/contact/contact';
import Dashboard from './views/dashboard/dashboard';
import Checkout from './views/checkout/checkout';
import Account from './views/account/account';
import ListUsersAdmin from './views/users/listUsersAdmin';

import FAQComponent from './views/faq/faq';

import OrderList from './views/myorders/myorders';
import OrderTrackingAdmin from './views/orderTracking/orderTrackingAdmin';
import OrderTracking from './views/orderTracking/orderTracking';
import CodeTracking from './views/orderTracking/codeTracking';


import { AuthProvider } from './context/AuthContext'; 

function HeaderSwitcher() {
  const location = useLocation();

  if (location.pathname.startsWith('/administrator')) {
    return <HeaderAdmin />;
  }
  return <Header />;
}

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/list" element={<ListProducts />} />
        <Route path="/administrator/dashboard" element={<ListProducts />} />
        <Route path="/administrator/products" element={<ListProductsAdmin />} />
        <Route path="/administrator/coupons" element={<ListCouponsAdmin />} />
        <Route path="/administrator/products/category" element={<ListCategoriesAdmin />} />
        <Route path="/about" element={< AboutUs/>} />
        <Route path="/contact" element={< ContactUs/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/administrator/users" element={<ListUsersAdmin />} />
        <Route path="/administrator/orders" element={<OrderTrackingAdmin />} />
        <Route path="/order-tracking/:trackingNumber" element={<OrderTracking />} />
        <Route path="/code-tracking" element={<CodeTracking />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faq" element={<FAQComponent />} />
        <Route path="*" element={<ErrorPage />} /> 
        <Route path="/myorders" element={<OrderList />} />  
      </Routes>
      
      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider> 
        <CartProvider> 
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
