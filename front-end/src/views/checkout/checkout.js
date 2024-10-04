import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Componente para mostrar la sección del banner
const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Pagar Pedido</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/products/list">Productos</Link>
            <span className="breadcrumb-item active" aria-current="page">Pagar pedido</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

// Componente para el checkout
const Checkout = () => {
    const location = useLocation();
    const { cart, total } = location.state || { cart: [], total: 0 };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'Guatemala',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        notes: '',
        paymentMethod: 'bankTransfer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log('Order data:', { ...formData, cart, total });
    };

    return (
        <>
            <BannerSection />
            <section className="shopify-cart checkout-wrap">
                <div className="container py-5 my-5">
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="row d-flex flex-wrap">
                            <div className="col-lg-6">
                                <h2 className="text-dark pb-3">Billing Details</h2>
                                <div className="billing-details">
                                    <label htmlFor="firstName">First Name*</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="form-control mt-2 mb-4 ps-3"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="lastName">Last Name*</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="form-control mt-2 mb-4 ps-3"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="companyName">Company Name (optional)</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        className="form-control mt-2 mb-4"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="country">Country / Region*</label>
                                    <select
                                        name="country"
                                        className="form-select form-control mt-2 mb-4"
                                        value={formData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="GT">Guatemala</option>
                                    </select>
                                    <label htmlFor="address">Street Address*</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="form-control mt-3 ps-3 mb-3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="House number and street name"
                                    />
                                    <input
                                        type="text"
                                        id="address2"
                                        name="address2"
                                        className="form-control ps-3 mb-4"
                                        value={formData.address2}
                                        onChange={handleChange}
                                        placeholder="Appartments, suite, etc."
                                    />
                                    <label htmlFor="city">Town / City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="form-control mt-3 ps-3 mb-4"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="state">State *</label>
                                    <select
                                        name="state"
                                        className="form-select form-control mt-2 mb-4"
                                        value={formData.state}
                                        onChange={handleChange}
                                    >
                                        <option value="Florida">Florida</option>
                                        <option value="New York">New York</option>
                                        <option value="Chicago">Chicago</option>
                                        <option value="Texas">Texas</option>
                                        <option value="San Jose">San Jose</option>
                                        <option value="Houston">Houston</option>
                                    </select>
                                    <label htmlFor="zip">Zip Code *</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        className="form-control mt-2 mb-4 ps-3"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="phone">Phone *</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="form-control mt-2 mb-4 ps-3"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email">Email address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control mt-2 mb-4 ps-3"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="text-dark pb-3">Additional Information</h2>
                                <div className="billing-details">
                                    <label htmlFor="notes">Order notes (optional)</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        className="form-control pt-3 pb-3 ps-3 mt-2"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Notes about your order. Like special notes for delivery."
                                    />
                                </div>
                                <div className="your-order mt-5">
                                    <h2 className="display-7 text-dark pb-3">Cart Totals</h2>
                                    <div className="total-price">
                                        <table cellSpacing="0" className="table">
                                            <tbody>
                                                <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                                                    <th>Total</th>
                                                    <td data-title="Total">
                                                        <span className="price-amount amount ps-5">
                                                            <bdi>
                                                                <span className="price-currency-symbol">Q</span>{total.toFixed(2)}
                                                            </bdi>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="list-group mt-5 mb-3">
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input
                                                    className="form-check-input flex-shrink-0"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="bankTransfer"
                                                    checked={formData.paymentMethod === 'bankTransfer'}
                                                    onChange={handleChange}
                                                />
                                                <span>
                                                    <strong className="text-uppercase">Direct bank transfer</strong>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input
                                                    className="form-check-input flex-shrink-0"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="checkPayments"
                                                    onChange={handleChange}
                                                />
                                                <span>
                                                    <strong className="text-uppercase">Check payments</strong>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input
                                                    className="form-check-input flex-shrink-0"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cashOnDelivery"
                                                    onChange={handleChange}
                                                />
                                                <span>
                                                    <strong className="text-uppercase">Cash on delivery</strong>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input
                                                    className="form-check-input flex-shrink-0"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="paypal"
                                                    onChange={handleChange}
                                                />
                                                <span>
                                                    <strong className="text-uppercase">Paypal</strong>
                                                </span>
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-dark btn-lg rounded-1 w-100">
                                            Place an order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Checkout;
