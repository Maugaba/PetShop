import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Pagar Pedido</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/products/list">Productos</Link>
            <span className="breadcrumb-item active" aria-current="page">Pagar Pedido</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

const Checkout = () => {
  const location = useLocation();
  const { cart = [], total = 0, cart2} = location.state || { cart: [], total: 0 };
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Estado para el departamento
  const shippingCost = selectedDepartment !== 'Guatemala' && total <= 150 ? 35 : 0; // Costo de envío
  const formattedTotal = (total + shippingCost).toFixed(2); // Total general incluyendo envío si aplica
  console.log('Datos del carrito:', cart, total, cart2);

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
    paymentMethod: 'bankTransfer',
    cart
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
    console.log('Datos de la orden:', { ...formData, cart, total });
  };

  return (
    <>
      <BannerSection />
      <section className="shopify-cart checkout-wrap">
        <div className="container py-5 my-5">
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="row d-flex flex-wrap">
              <div className="col-lg-6">
                <h2 className="text-dark pb-3">Detalles de Facturación</h2>
                <div className="billing-details">
                  <label htmlFor="firstName">Nombre*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control mt-2 mb-4 ps-3"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="lastName">Apellido*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control mt-2 mb-4 ps-3"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="companyName">Nombre de la Empresa (opcional)</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="form-control mt-2 mb-4"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  <label htmlFor="country">País / Región*</label>
                  <select
                    name="country"
                    className="form-select form-control mt-2 mb-4"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="GT">Guatemala</option>
                  </select>
                  <label htmlFor="state">Departamento *</label>
                  <select
                    name="state"
                    className="form-select form-control mt-2 mb-4"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="Alta Verapaz">Alta Verapaz</option>
                    <option value="Baja Verapaz">Baja Verapaz</option>
                    <option value="Chimaltenango">Chimaltenango</option>
                    <option value="Chiquimula">Chiquimula</option>
                    <option value="El Progreso">El Progreso</option>
                    <option value="Escuintla">Escuintla</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Huehuetenango">Huehuetenango</option>
                    <option value="Izabal">Izabal</option>
                    <option value="Jalapa">Jalapa</option>
                    <option value="Jutiapa">Jutiapa</option>
                    <option value="Petén">Petén</option>
                    <option value="Quetzaltenango">Quetzaltenango</option>
                    <option value="Quiché">Quiché</option>
                    <option value="Retalhuleu">Retalhuleu</option>
                    <option value="Sacatepéquez">Sacatepéquez</option>
                    <option value="San Marcos">San Marcos</option>
                    <option value="Santa Rosa">Santa Rosa</option>
                    <option value="Sololá">Sololá</option>
                    <option value="Suchitepéquez">Suchitepéquez</option>
                    <option value="Totonicapán">Totonicapán</option>
                    <option value="Zacapa">Zacapa</option>
                  </select>
                  <label htmlFor="address">Dirección*</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control mt-3 ps-3 mb-3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Número y nombre de calle"
                  />
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    className="form-control ps-3 mb-4"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Apartamento, suite, etc."
                  />
                  <label htmlFor="zip">Código Postal *</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control mt-2 mb-4 ps-3"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control mt-2 mb-4 ps-3"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Correo Electrónico *</label>
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
                <h2 className="text-dark pb-3">Información Adicional</h2>
                <div className="billing-details">
                  <label htmlFor="notes">Notas del Pedido (opcional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control pt-3 pb-3 ps-3 mt-2"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notas especiales para la entrega."
                  />
                </div>
                <div className="your-order mt-5">
                  <h2 className="display-7 text-dark pb-3">Totales del Carrito</h2>
                  <table cellSpacing="0" className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Precio Total</th>
                      </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Q{(item.price)}</td>
                            <td>Q{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                            <th>Total Envío</th>
                            <td colSpan="2"></td> {/* Deja este espacio vacío para que no afecte la alineación */}
                            <td>
                            <span className="price-amount amount ">
                                <bdi>
                                    <span className="price-currency-symbol">Q</span>{shippingCost.toFixed(2)}
                                </bdi>
                            </span>
                            </td>
                        </tr>
                        <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                            <th>Total General</th>
                            <td colSpan="2"></td> {/* Deja este espacio vacío para que no afecte la alineación */}
                            <td>
                            <span className="price-amount amount ">
                                <bdi>
                                <span className="price-currency-symbol">Q</span>{formattedTotal}
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
                        <strong className="text-uppercase">Transferencia Bancaria</strong>
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
                        <strong className="text-uppercase">Pago con Cheque</strong>
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
                        <strong className="text-uppercase">Pago Contra Entrega</strong>
                      </span>
                    </label>
                    <label className="list-group-item d-flex gap-2 border-0">
                      <input
                        className="form-check-input flex-shrink-0"
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        onChange={handleChange} /> 
                    <span> 
                    <strong className="text-uppercase">Paypal</strong> </span> </label>
                </div> 
                <button type="submit" className="btn btn-primary mt-4 w-100"> Realizar Pedido </button> 
                </div> 
            </div> 
        </div> 
        </form> 
    </div> 
</section> 
</> ); 
};

export default Checkout;
