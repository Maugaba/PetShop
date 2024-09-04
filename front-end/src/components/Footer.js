import React from 'react';

const Footer = () => {
  return (
    <>
      <footer id="footer" className="my-5">
        <div className="container py-5 my-5">
          <div className="row">
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="footer-menu">
                <h3>Enlaces rápidos</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Inicio</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Sobre nosotros</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Ofrecer</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Servicios</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Contáctenos</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-menu">
                <h3>Centro de ayuda</h3>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Preguntas frecuentes</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Pago</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Devoluciones y reembolsos</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Caja</a>
                  </li>
                  <li className="menu-item">
                    <a href="javascript;" className="nav-link">Información de entrega</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <h3>Nuestro Boletín</h3>
                <p className="blog-paragraph fs-6">
                  Suscríbete a nuestro boletín para recibir actualizaciones sobre nuestras grandes ofertas.
                </p>
                <div className="search-bar border rounded-pill border-dark-subtle px-2">
                  <form className="text-center d-flex align-items-center" action="" method="">
                    <input type="text" className="form-control border-0 bg-transparent" placeholder="Ingresa tu email aqui" />
                    <iconify-icon className="send-icon" icon="tabler:location-filled"></iconify-icon>
                  </form>
                </div>
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
              <p className="secondary-font">© 2024 CMFMN. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
