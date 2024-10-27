import React from 'react';
import { Link } from 'react-router-dom';

const FAQComponent = () => {
  return (
    <div>
      {/* Sección de Banner */}
      <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
        <div className="container">
          <div className="hero-content py-5 my-3">
            <h2 className="display-1 mt-3 mb-0">Preguntas Frecuente<span className="text-primary">s</span></h2>
            <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item nav-link">Inicio</Link>
              <span className="breadcrumb-item active" aria-current="page">Preguntas Frecuentes</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="faqs-wrap">
        <div className="container py-5 my-5">
          <div className="row my-4">
            <main className="col-md-12 pe-5">
              <h2 className="mb-3">Preguntas frecuentes</h2>
              <p>Bienvenido a Digital Paw, tu tienda en línea especializada en accesorios para mascotas en Guatemala. 
                Nos dedicamos a ofrecer productos de calidad para consentir a tus compañeros peludos. 
                Para ayudarte a tener una mejor experiencia de compra, hemos recopilado las preguntas más frecuentes de nuestros clientes</p>
              <div className="page-content my-5">
                <div className="accordion mb-5" id="accordionExample">
                  {[
                    { question: "¿Qué métodos de pago existen?", answer: "En Digital Paw aceptamos múltiples formas de pago para tu comodidad: tarjetas de crédito y débito, PayPal, pago en efectivo contra entrega y depósito bancario. Selecciona el método que mejor se adapte a tus necesidades al momento de realizar tu compra." },
                    { question: "¿Necesito abrir una cuenta obligatoriamente?", answer: "No es necesario crear una cuenta para realizar compras en Digital Paw. Puedes realizar tu pedido como invitado. Sin embargo, tener una cuenta te permite dar seguimiento a tus pedidos y guardar tus direcciones de envío para futuras compras." },
                    { question: "¿Puedo obtener descuentos?",answer: "¡Sí! Publicamos códigos de descuento durante ocasiones especiales en nuestra página de Facebook. Te invitamos a seguirnos en nuestras redes sociales para mantenerte informado sobre promociones exclusivas y ofertas especiales." },
                    { question: "¿Debo pagar extra por la entrega?",answer: "El envío es totalmente gratuito en pedidos mayores a Q150. Para compras por debajo de este monto, se aplicará una tarifa de envío que se calculará según la ubicación de entrega." },
                    { question: "¿Puedo cancelar mi entrega?",answer: "Una vez que el producto ha sido despachado para entrega, no es posible cancelar el pedido. Te recomendamos estar seguro de tu compra antes de confirmarla y contactarnos lo antes posible si necesitas hacer algún cambio." },
                    { question: "¿Cuál es su política de reembolsos?",answer: "Aceptamos devoluciones dentro de los 7 días posteriores a la fecha de compra, siempre y cuando el producto se encuentre en su estado original y sin usar. Para procesar el reembolso, el artículo debe estar en perfectas condiciones, con su empaque original y todos sus accesorios." },
                    { question: "¿Dónde se encuentra su tienda?",answer: "Digital Paw es una tienda 100% en línea que opera en Guatemala. Nos especializamos en la venta de accesorios para mascotas a través de nuestra plataforma digital, ofreciendo envíos a todo el país para tu comodidad." },
                  ].map((faq, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          <h5>{faq.question}</h5>
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                      >
                        <div className="accordion-body secondary-font">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
        
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQComponent;
