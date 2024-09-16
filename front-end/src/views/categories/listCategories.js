import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../../api/apiUrl'; // Ajusta el path si es necesario

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Categorías de Productos</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
            <span className="breadcrumb-item active" aria-current="page">Categorías</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl + '/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Error al cargar las categorías');
      });
  }, []);

  return (
    <div className="shopify-grid">
      <BannerSection />
      <div className="container py-5 my-5">
        <main className="col-md-9">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="product-grid row">
            {categories.map((category) => (
              <div className="col-md-4 my-4" key={category.id}>
                <div className="card position-relative">
                  <h3 className="card-title pt-4 m-0">{category.name}</h3>
                  <div className="card-text">
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListCategories;
