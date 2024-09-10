import React from 'react';
import Cart, { CartNumber } from './Cart';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <>

      <Cart />

      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasSearch"
        aria-labelledby="Search">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">Buscar</h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
              <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                <input type="text" className="form-control border-0 bg-transparent" placeholder="Buscar aqui" />
                <iconify-icon icon="tabler:search" className="fs-4 me-3"></iconify-icon>
              </form>
            </div>
          </div>
        </div>
      </div>

      <header>
        <div className="container py-2">
          <div className="row py-4 pb-0 pb-sm-4 align-items-center ">
            <div className="col-sm-4 col-lg-3 text-center text-sm-start">
              <div className="main-logo">
                <a href="index.html">
                  <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '10%', width: '80%' }} />
                </a>
              </div>
            </div>

            <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
              <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                  <input type="text" className="form-control border-0 bg-transparent" placeholder="Buscar productos" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                  </svg>
                </form>
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
                  <a href="account.html" className="mx-3">
                    <iconify-icon icon="healthicons:person" className="fs-4"></iconify-icon>
                  </a>
                </li>
                <li>
                  <a href="wishlist.html" className="mx-3">
                    <iconify-icon icon="mdi:heart" className="fs-4"></iconify-icon>
                  </a>
                </li>

                <li>
                  <a href="javascript;" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart">
                    <iconify-icon icon="mdi:cart" className="fs-4 position-relative"></iconify-icon>
                    <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">03</span>
                  </a>
                </li>

                <li>
                  <a href="javascript;" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch"
                    aria-controls="offcanvasSearch">
                    <iconify-icon icon="tabler:search" className="fs-4"></iconify-icon>
                  </a>
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
                      <a href="account.html" className="mx-3">
                        <iconify-icon icon="healthicons:person" className="fs-4"></iconify-icon>
                      </a>
                    </li>
                    <li>
                      <a href="wishlist.html" className="mx-3">
                        <iconify-icon icon="mdi:heart" className="fs-4"></iconify-icon>
                      </a>
                    </li>

                    <li style={{marginTop: '32px'}}>
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
