import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../api/apiUrl';
import Swal from 'sweetalert2';

const BannerSection = () => (
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

const Checkout = () => {
  const location = useLocation();
  const { cart = [], total = 0, cart_id = 0} = location.state || { cart: [], total: 0, cart_id: 0 };
  const [selectedDepartment, setSelectedDepartment] = useState('Guatemala');
  const [isProcessing, setIsProcessing] = useState(false);

  let shippingCost = selectedDepartment === 'Guatemala' && total >= 150 ? 0 : 35;
  const formattedTotal = (total + shippingCost).toFixed(2);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', nit: '', country: 'Guatemala', address: '',
    address2: '', city: '', state: 'Guatemala', zip: '', notes: '',
    paymentMethod: 'Transferencia Bancaria', transactionNumber: '', checkNumber: '', cart, cart_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    setFormData(prev => ({
      ...prev,
      state: value
    }));
  };

  useEffect(() => {
    // Cargar el SDK solo si no está presente en el DOM
    const existingScript = document.querySelector('script[src*="https://www.paypal.com/sdk/js"]');
    if (existingScript) {
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AR25HYB9kRQkvmNcQHUtDFRtk4WVFNBKm6W-eJtzIrWDUbD2hpOMOv8s9G1EyMHuDaGKQ7AqYnJj1uNz`;
    script.async = true;

    script.onload = () => {
      if (formData.paymentMethod === 'paypal') {
        window.paypal.Buttons({
          createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: formattedTotal } }],
          }),
          onApprove: async (data, actions) => {
            try {
              const orderDetails = await actions.order.capture();
              const transactionNumber = orderDetails.id; // Obtiene el número de transacción de PayPal
    
              // Actualiza formData
              formData.paymentMethod = 'paypal';
              formData.transactionNumber = transactionNumber;
    
              // Preparar los datos para la orden
              const orderData = {
                ...formData,
                cart,
                shippingCost,
                total: parseFloat(formattedTotal)
              };
    
              // Enviar los datos de la orden al servidor
              const response = await axios.post(apiUrl + '/orders', orderData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
              });
    
              console.log('Order response:', response);
              if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: '¡Éxito!',
                  text: 'Su orden ha sido procesada correctamente',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                });
                window.location.href = '/myorders';
              }
            } catch (error) {
              console.error('Error al procesar el pago con PayPal:', error);
              Swal.fire({ title: 'Error', text: 'Error al procesar el pago con PayPal', icon: 'error' });
            } finally {
              setIsProcessing(false);
            }
          },
          onError: (err) => {
            console.error('Error en PayPal:', err);
            Swal.fire({ title: 'Error', text: 'Error al procesar el pago con PayPal', icon: 'error' });
          },
        }).render('#paypal-button-container');
      }
    };

    script.onerror = () => {
      console.error('Error al cargar el SDK de PayPal');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  });



  const renderPaymentFields = () => {
    switch (formData.paymentMethod) {
      case 'Transferencia Bancaria':
        return (
          <div className="mt-3">
            <label htmlFor="transactionNumber">Número de Transacción*</label>
            <input
              type="text"
              id="transactionNumber"
              name="transactionNumber"
              className="form-control mt-2 mb-4 ps-3"
              value={formData.transactionNumber}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 'Pago con Cheque':
        return (
          <div className="mt-3">
            <label htmlFor="checkNumber">Número de Cheque*</label>
            <input
              type="text"
              id="checkNumber"
              name="checkNumber"
              className="form-control mt-2 mb-4 ps-3"
              value={formData.checkNumber}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 'paypal':
        return <div id="paypal-button-container" className="mt-3"></div>;
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const orderData = {
        ...formData,
        cart,
        shippingCost,
        total: parseFloat(formattedTotal)
      };
      const response = await axios.post(apiUrl + '/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log('Order response:', response);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Su orden ha sido procesada correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        window.location.href = '/myorders';
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      Swal.fire({ title: 'Error', text: 'Error al procesar la orden', icon: 'error' });
    } finally {
      setIsProcessing(false);
    }
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
                    <label htmlFor="nit">NIT</label>
                    <input
                      type="text"
                      id="nit"
                      name="nit"
                      className="form-control mt-2 mb-4"
                      value={formData.nit}
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
                      onChange={handleDepartmentChange} // Usar el nuevo manejador
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
                            <td>Q{item.price}</td>
                            <td>Q{(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                          <th>Total Envío</th>
                          <td colSpan="2"></td>
                          <td>
                            <span className="price-amount amount">
                              <bdi>
                                <span className="price-currency-symbol">Q</span>{shippingCost.toFixed(2)}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                          <th>Total General</th>
                          <td colSpan="2"></td>
                          <td>
                            <span className="price-amount amount">
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
                          value="Transferencia Bancaria"
                          checked={formData.paymentMethod === 'Transferencia Bancaria'}
                          onChange={handleChange}
                        />
                        <span>
                          <strong className="text-uppercase">Transferencia Bancaria</strong>
                          <p className="small mb-0">Realiza tu transferencia al banco BAC CREDOMATIC cuenta monetaria #45654521</p>
                        </span>
                      </label>
                      <label className="list-group-item d-flex gap-2 border-0">
                        <input
                          className="form-check-input flex-shrink-0"
                          type="radio"
                          name="paymentMethod"
                          value="Pago con Cheque"
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
                          value="Pago Contra Entrega"
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
                          onChange={handleChange}
                        />
                        <span>
                          <strong className="text-uppercase">Pago con PayPal</strong>
                        </span>
                      </label>
                      {renderPaymentFields()}
                      <div id="paypal-button-container"></div> 
                      <button 
                        type="submit" 
                        className="btn btn-primary mt-4 w-100" 
                        disabled={isProcessing ? true : false}
                      > 
                        {isProcessing ? 'Procesando...' : 'Realizar Pedido'}
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
