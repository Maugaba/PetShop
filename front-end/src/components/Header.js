import React, { useState, useEffect } from 'react';
import Cart, { CartNumber } from './Cart';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react'; // Asegúrate de importar el componente de iconos
import apiUrl from '../api/apiUrl';

const Header = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch all products on component mount
    fetch(apiUrl + '/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault(); // Evita el envío del formulario
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      ));
    }
  };

  return (
    <>
      <Cart />
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasSearch" aria-labelledby="Search">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">Buscar</h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
              <div className="text-center d-flex align-items-center">
                <input
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Buscar aqui"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Icon icon="tabler:search" className="fs-4 me-3" />
              </div>
            </div>
            <div className="search-results mt-3">
              {filteredProducts.length > 0 ? (
                <ul className="list-unstyled">
                  {filteredProducts.map(product => (
                    <li key={product.id}>
                      <Link to={`/product/${product.id}`} className="d-block">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se encontraron productos.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <header>
        <div className="container py-2">
          <div className="row py-4 pb-0 pb-sm-4 align-items-center ">
            <div className="col-sm-4 col-lg-3 text-center text-sm-start">
              <div className="main-logo">
              <Link to="/">
                <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '10%', width: '80%' }} />
              </Link>
              </div>
            </div>

            <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
              <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                <div className="text-center d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
              <Link to="/administrator/dashboard"><button className="btn btn-primary">Administrador</button></Link>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <hr className="m-0"></hr>
        </div>

        <div className="container">
          <nav className="main-menu d-flex navbar navbar-expand-lg ">

            <div className="d-flex d-lg-none align-items-end mt-3 ">
              <ul className="d-flex justify-content-end list-unstyled m-0">
                <li>
                  <a href="/account" className="mx-3">
                    <Icon icon="healthicons:person" className="fs-4" />
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="mx-3">
                    <Icon icon="mdi:heart" className="fs-4" />
                  </a>
                </li>

                <li>
                  <button className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart">
                    <Icon icon="mdi:cart" className="fs-4 position-relative" />
                    <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">03</span>
                  </button>
                </li>

                <li>
                  <button className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch"
                    aria-controls="offcanvasSearch">
                    <Icon icon="tabler:search" className="fs-4" />
                  </button>
                </li>
              </ul>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header justify-content-center">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              <div className="offcanvas-body justify-content-between align-items-center">
                <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products/list" className={`nav-link ${location.pathname === '/products/list' ? 'active' : ''}`}>Productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contáctanos</Link>
                  </li>
                </ul>

                <div className="d-none d-lg-flex align-items-end">
                  <ul className="d-flex justify-content-end list-unstyled m-0 align-items-center">
                    <li>
                      <a href="/account" className="mx-3">
                        <Icon icon="healthicons:person" className="fs-4" />
                      </a>
                    </li>
                    <li>
                      <a href="/wishlist" className="mx-3">
                        <Icon icon="mdi:heart" className="fs-4" />
                      </a>
                    </li>

                    <li style={{ marginTop: '32px' }}>
                      <CartNumber />
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
