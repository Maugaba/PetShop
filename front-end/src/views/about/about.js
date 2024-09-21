import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div>
      <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
        <div className="container">
          <div className="hero-content py-5 my-3">
            <h2 className="display-1 mt-3 mb-0">Acerca de <span className="text-primary">Digital Paw</span></h2>
            <nav className="breadcrumb">
              <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
              <span className="breadcrumb-item active" aria-current="page">Acerca de Nosotros</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="my-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 my-4 pe-5">
              <h2 className="">Cómo Comenzó Digital Paw</h2>
              <p>Digital Paw nació con la misión de proporcionar los mejores productos para tus mascotas. Creemos que cada mascota merece lo mejor, y es por eso que nos dedicamos a ofrecer solo los productos más confiables y de alta calidad.</p>
            </div>
            <div className="col-md-6 my-4">
              <h2 className="">Más Sobre Nosotros</h2>
              <p>En Digital Paw, nos dedicamos a:</p>
              <p className="m-0"> <span className="text-primary">✓</span> Ofrecer una amplia variedad de productos para mascotas.</p>
              <p className="m-0"> <span className="text-primary">✓</span> Brindar un excelente servicio al cliente.</p>
              <p className="m-0"> <span className="text-primary">✓</span> Promover la salud y el bienestar de las mascotas.</p>
              <p className="m-0"> <span className="text-primary">✓</span> Educar a los dueños de mascotas sobre el cuidado adecuado.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="display-4">Puedes comprar los mejores productos para mascotas en Digital Paw.</h2>
            </div>
            <div className="col-md-6">
              <p>En Digital Paw, creemos que cada mascota merece lo mejor. Ofrecemos una selección de productos de alta calidad que garantizan la felicidad y salud de tus compañeros peludos.</p>
              <p>Nos esforzamos por brindar un servicio excepcional, asegurando que cada cliente se sienta valorado y satisfecho con su compra. Tu confianza es nuestra prioridad, y estamos aquí para ayudarte a encontrar todo lo que tu mascota necesita.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 py-5">
        <div className="container">
          <h2 className="text-primary">Misión</h2>
          <p>Proporcionar productos de la más alta calidad para mascotas, asegurando su bienestar y felicidad, y educando a los dueños sobre el cuidado adecuado.</p>
          <h2 className="text-primary">Visión</h2>
          <p>Ser la tienda de referencia para dueños de mascotas en busca de productos confiables y un excelente servicio al cliente, promoviendo el amor y cuidado por los animales.</p>
          <h2 className="text-primary">Valores</h2>
          <p>✓ Calidad: Comprometidos con los mejores productos para mascotas.</p>
          <p>✓ Compasión: Promovemos el bienestar animal en todo momento.</p>
          <p>✓ Confianza: Generamos un ambiente de confianza y seguridad para nuestros clientes.</p>
          <p>✓ Innovación: Buscamos constantemente mejorar y adaptarnos a las necesidades de los dueños de mascotas.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
