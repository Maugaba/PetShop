import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderAdmin = () => {
  const location = useLocation();

  return (
    <>

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


        <div className="container-fluid">
          <hr className="m-0"></hr>
        </div>
        
        <div className="container">
          
          <nav className="main-menu d-flex navbar navbar-expand-lg ">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header justify-content-center">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body justify-content-between">

                
                <div className="d-none d-lg-flex align-items-start align-items-center">
                  <div className="main-logo">
                    <a href="index.html">
                      <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '65px', width: '150px' }} />
                    </a>
                  </div>
                </div>  
                <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0 align-items-center" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  
                  <li className="nav-item">
                    <Link to="/administrator/dashboard" className={`nav-link ${location.pathname === '/administrator/dashboard' ? 'active' : ''}`}>Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/administrator/products" className={`nav-link ${location.pathname === '/administrator/products' ? 'active' : ''}`}>Productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/administrator/products/category" className={`nav-link ${location.pathname === '/administrator/products/category' ? 'active' : ''}`}>Categorias de productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/administrator/coupons" className={`nav-link ${location.pathname === '/administrator/coupons' ? 'active' : ''}`}>Cupones</Link>
                  </li>
                </ul>
        
                <div className="d-none d-lg-flex align-items-end align-items-center">
                  <ul className="d-flex justify-content-end list-unstyled m-0">
                  <Link to="/administrator/dashboard"><button className="btn btn-danger" style={{width: '150px'}}>Cerrar sesion</button></Link>
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

export default HeaderAdmin;
