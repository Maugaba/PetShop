import React from 'react';
import { Link, useLocation} from 'react-router-dom';
const Footer = () => {
  const location = useLocation();
  return (
    <>
      <footer id="footer" className="my-5">
        <div className="container py-5 my-5">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-menu">
              <img src="/images/LogoV2.png" alt="logo" className="img-fluid" style={{ height: '10%', width: '80%' }} />
              <p className="blog-paragraph fs-6 mt-3">
                Suscríbete a nuestro boletín para recibir actualizaciones sobre nuestras grandes ofertas.
                </p>
                <div className="social-links">
                  <ul className="d-flex list-unstyled gap-2">
                    <li className="social">
                      <a href="javascript;">
                        <iconify-icon className="social-icon" icon="ri:facebook-fill"></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="javascript;">
                        <iconify-icon className="social-icon" icon="ri:twitter-fill"></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="javascript;">
                        <iconify-icon className="social-icon" icon="ri:pinterest-fill"></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="javascript;">
                        <iconify-icon className="social-icon" icon="ri:instagram-fill"></iconify-icon>
                      </a>
                    </li>
                    <li className="social">
                      <a href="javascript;">
                        <iconify-icon className="social-icon" icon="ri:youtube-fill"></iconify-icon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-menu">
                <h3>Enlaces rápidos</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                  <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/products/list" className={`nav-link ${location.pathname === '/products/list' ? 'active' : ''}`}>Productos</Link>
                  </li>
                  <li className="menu-item">
                  <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contáctanos</Link>
                  </li>
                  <li className="menu-item">
                  <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Acerca de Nosotros</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-menu">
                <h3>Centro de ayuda</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}>Preguntas frequentes</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div id="footer-bottom">
        <div className="container">
          <hr className="m-0" />
          <div className="row mt-3">
            <div className="col-md-6 copyright">
              <p className="secondary-font">© 2024 DigitalPaw. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
