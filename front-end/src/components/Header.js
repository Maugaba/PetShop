import React, { useContext } from 'react';
import Cart, { CartNumber } from './Cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'; 
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogged, logout, user } = useContext(AuthContext);

  return (
    <>
      <Cart />
      <header>
        <div className="container">
          <nav className="main-menu d-flex navbar navbar-expand-lg ">
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-body justify-content-between">
                <div className="d-none d-lg-flex align-items-start align-items-center">
                  <div className="main-logo">
                    <a href="/">
                      <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '100px', width: '250px' }} />
                    </a>
                  </div>
                </div>  
                <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0 align-items-center" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products/list" className={`nav-link ${location.pathname === '/products/list' ? 'active' : ''}`}>Productos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contáctanos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Acerca de Nosotros</Link>
                  </li>
                </ul>
                <div className="d-none d-lg-flex align-items-center">
                  <ul className="d-flex justify-content-end list-unstyled m-0 align-items-center">
                    <li>
                      <a href="/account" className="mx-3">
                        <Icon icon="healthicons:person" className="fs-4" />
                      </a>
                    </li>
                    <li className="me-3">
                      <CartNumber />
                    </li>
                    <li className="me-3">
                      <Link to="/order-tracking" className="mx-3">
                        <Icon icon="mdi:truck" className="fs-4" /> {/* Truck Icon */}
                      </Link>
                    </li>
                    <li>
                      {!isLogged ? (
                        <div className="d-flex">
                          <button className="btn btn-primary btn-sm me-2" onClick={() => navigate('/account')}>Iniciar sesión</button>
                        </div>
                      ) : (
                        <div className="d-flex">
                          {user?.role_id === 1 && (
                            <button className="btn btn-primary btn-sm me-2" onClick={() => navigate('/administrator/dashboard')}>Administrador</button>
                          )}
                          <button className="btn btn-danger btn-sm" onClick={logout}>Cerrar Sesión</button>
                        </div>
                      )}
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
