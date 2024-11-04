import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [openPolicy, setOpenPolicy] = useState(null);

  const togglePolicy = (policyName) => {
    setOpenPolicy(openPolicy === policyName ? null : policyName);
  };

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
                    {/* Redes sociales */}
                    <li className="social">
                      <button onClick={() => window.open('https://facebook.com', '_blank')} className="social-icon-btn">
                        <iconify-icon className="social-icon" icon="ri:facebook-fill"></iconify-icon>
                      </button>
                    </li>
                    <li className="social">
                      <button onClick={() => window.open('https://twitter.com', '_blank')} className="social-icon-btn">
                        <iconify-icon className="social-icon" icon="ri:twitter-fill"></iconify-icon>
                      </button>
                    </li>
                    <li className="social">
                      <button onClick={() => window.open('https://pinterest.com', '_blank')} className="social-icon-btn">
                        <iconify-icon className="social-icon" icon="ri:pinterest-fill"></iconify-icon>
                      </button>
                    </li>
                    <li className="social">
                      <button onClick={() => window.open('https://instagram.com', '_blank')} className="social-icon-btn">
                        <iconify-icon className="social-icon" icon="ri:instagram-fill"></iconify-icon>
                      </button>
                    </li>
                    <li className="social">
                      <button onClick={() => window.open('https://youtube.com', '_blank')} className="social-icon-btn">
                        <iconify-icon className="social-icon" icon="ri:youtube-fill"></iconify-icon>
                      </button>
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
                    <Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}>Preguntas frecuentes</Link>
                  </li>

                  {/* Política de privacidad y términos y condiciones */}
                  <li className="menu-item">
                    <p onClick={() => togglePolicy('terminos')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#007bff' }}>
                      Términos y condiciones
                    </p>
                    {openPolicy === 'terminos' && (
                      <div className="policy-content">
                        <p>Al utilizar nuestro sitio, aceptas nuestros términos y condiciones. Consulta los términos completos en la sección de políticas de nuestra web.</p>
                      </div>
                    )}
                  </li>
                  <li className="menu-item">
                    <p onClick={() => togglePolicy('privacidad')} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#007bff' }}>
                      Política de privacidad
                    </p>
                    {openPolicy === 'privacidad' && (
                      <div className="policy-content">
                        <p>Valoramos tu privacidad. Consulta nuestra política para conocer cómo usamos y protegemos tu información personal.</p>
                      </div>
                    )}
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

      {}
      <style>{`
        .footer-menu .menu-item {
          margin-bottom: 10px;
        }
        .footer-menu .policy-content {
          padding: 10px;
          border-left: 3px solid #007bff;
          margin-top: 5px;
          background-color: #f9f9f9;
        }
        .social-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Footer;
