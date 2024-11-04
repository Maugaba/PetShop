import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div>
      <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
        <div className="container">
          <div className="hero-content py-5 my-3">
            <h2 className="display-1 mt-3 mb-0">Contacto</h2>
            <nav className="breadcrumb">
              <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
              <span className="breadcrumb-item active" aria-current="page">Contacto</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <div className="container py-5 my-5">
          <div className="row">
            <div className="contact-info col-lg-12 pb-3">
              <h2 className="text-dark">Información de Contacto</h2>
              <p>Estamos aquí para ayudarte con cualquier pregunta o inquietud que tengas.</p>
              <div className="page-content d-flex flex-wrap mt-5">
                <div className="col-lg-6 col-sm-12">
                  <div className="content-box text-dark pe-4 mb-5">
                    <h4 className="card-title">Oficina</h4>
                    <div className="contact-address pt-3">
                      <p>28 Avenida, Zona 1, Quetzaltenango, Guatemala.</p>
                    </div>
                    <div className="contact-number">
                    <p>
                        <a href="tel:+50249621478">+502 49621478</a>
                      </p>
                      <p>
                        <a href="tel:+50246131012">+502 46131012 </a>
                      </p>
                      <p>
                        <a href="tel:+50237506840">+502 37506840 </a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="mailto:digatalpaw@gmail.com">digatalpaw@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="content-box">
                    <h4 className="card-title">Gestión</h4>
                    <div className="contact-address pt-3">
                      <p>730 Glenstone Ave 65802, Springfield, EE. UU.</p>
                    </div>
                    <div className="contact-number">
                      <p>
                        <a href="tel:+50249621478">+502 49621478</a>
                      </p>
                      <p>
                        <a href="tel:+50246131012">+502 46131012 </a>
                      </p>
                      <p>
                        <a href="tel:+50237506840">+502 37506840 </a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="mailto:digatalpaw@gmail.com">digatalpaw@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
