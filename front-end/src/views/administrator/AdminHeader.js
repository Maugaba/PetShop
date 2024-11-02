import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const HeaderAdmin = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  return (
    <>

      <header>
        <div className="container">
          <nav className="main-menu d-flex navbar navbar-expand-lg ">
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                  <li className="nav-item">
                    <Link to="/administrator/users" className={`nav-link ${location.pathname === '/administrator/users' ? 'active' : ''}`}>Usuarios</Link>
                  </li>
                </ul>
        
                <div className="d-none d-lg-flex align-items-end align-items-center">
                  <ul className="d-flex justify-content-end list-unstyled m-0">
                  <button className="btn btn-danger" style={{width: '150px'}} onClick={logout}>Cerrar sesion</button>
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
