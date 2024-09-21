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
            <div className="contact-info col-lg-6 pb-3">
              <h2 className="text-dark">Información de Contacto</h2>
              <p>Estamos aquí para ayudarte con cualquier pregunta o inquietud que tengas.</p>
              <div className="page-content d-flex flex-wrap mt-5">
                <div className="col-lg-6 col-sm-12">
                  <div className="content-box text-dark pe-4 mb-5">
                    <h4 className="card-title">Oficina</h4>
                    <div className="contact-address pt-3">
                      <p>730 Glenstone Ave 65802, Springfield, EE. UU.</p>
                    </div>
                    <div className="contact-number">
                      <p>
                        <a href="tel:+123987321">+123 987 321</a>
                      </p>
                      <p>
                        <a href="tel:+123123654">+123 123 654</a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="mailto:contact@digitalpaw.com">contact@digitalpaw.com</a>
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
                        <a href="tel:+123987321">+123 987 321</a>
                      </p>
                      <p>
                        <a href="tel:+123123654">+123 123 654</a>
                      </p>
                    </div>
                    <div className="email-address">
                      <p>
                        <a href="mailto:contact@digitalpaw.com">contact@digitalpaw.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inquiry-item col-lg-6">
              <div className="rounded-5">
                <h2 className="text-dark">Ponte en Contacto</h2>
                <p>Utiliza el formulario a continuación para contactarnos.</p>
                <form id="form" className="form-group flex-wrap">
                  <div className="form-input col-lg-12 d-flex mb-3">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Escribe tu Nombre Aquí" 
                      className="form-control ps-3 me-3" 
                      style={{ border: '1px solid #ccc' }} 
                      required 
                    />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Escribe tu Correo Electrónico Aquí" 
                      className="form-control ps-3" 
                      style={{ border: '1px solid #ccc' }} 
                      required 
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Número de Teléfono" 
                      className="form-control ps-3" 
                      style={{ border: '1px solid #ccc' }} 
                      required 
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="Escribe tu Asunto Aquí" 
                      className="form-control ps-3" 
                      style={{ border: '1px solid #ccc' }} 
                      required 
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <textarea 
                      name="message" 
                      placeholder="Escribe tu Mensaje Aquí" 
                      className="form-control ps-3" 
                      style={{ border: '1px solid #ccc', height: '150px' }} 
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-dark btn-lg rounded-1">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
