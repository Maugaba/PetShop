import React, { useState, useEffect } from 'react';
import Cart, { CartNumber } from './Cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Header = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('id_user');
    setIsAdmin(userId === '1');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('id_user');
    setIsAdmin(false);
    navigate('/');
  };

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
                    <a href="index.html">
                      <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '65px', width: '150px' }} />
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
                      {isAdmin ? (
                        <div className="d-flex">
                          <button className="btn btn-primary btn-sm me-2" onClick={() => navigate('/administrator/dashboard')}>Administrador</button>
                          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                      ) : (
                        <div className="d-flex">
                          <button className="btn btn-primary btn-sm me-2" onClick={() => navigate('/login')}>Iniciar sesion</button>
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
