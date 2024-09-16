import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../../api/apiUrl';
import moment from 'moment';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Cupones</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
            <span className="breadcrumb-item active" aria-current="page">Cupones</span>
          </nav>
        </div>
      </div>
    </section>
  );
}

const ListCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl + '/coupons')
      .then(response => response.json())
      .then(data => setCoupons(data))
      .catch(error => {
        console.error('Error fetching coupons:', error);
        setError('Error al cargar los cupones');
      });
  }, []);

  return (
    <div className="shopify-grid">
      <BannerSection />
      <div className="container py-5 my-5">
        <main className="col-md-9">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="product-grid row">
            {coupons.map((coupon) => (
              <div className="col-md-4 my-4" key={coupon.id}>
                <div className="card position-relative">
                  <h3 className="card-title pt-4 m-0">{coupon.code}</h3>
                  <div className="card-text">
                    <h3 className="secondary-font text-primary">${coupon.discount_amount}</h3>
                    <p>{coupon.description}</p>
                    <p>Válido desde: {coupon.valid_from}</p>
                    <p>Válido hasta: {coupon.valid_to}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListCoupons;
