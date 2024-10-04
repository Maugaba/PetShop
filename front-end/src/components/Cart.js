import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity || 0), 0);
  
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/checkout', { state: { cart, total } }); // Redirige a la vista de checkout con estado
  };

  const formattedTotal = total.toFixed(2);

  return (
    <>
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Tu carrito</span>
              <span className="badge bg-primary rounded-circle pt-2">{cart.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Cantidad: 
                      <input 
                        type="number" 
                        value={item.quantity} 
                        min="1"
                        onChange={(e) => handleQuantityChange(e, item.id)} 
                        style={{ width: '50px', marginLeft: '10px' }}
                      />
                    </small>
                  </div>
                  <span className="text-body-secondary">Q{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Total (Q)</span>
                <strong>Q{formattedTotal}</strong>
              </li>
            </ul>
            
            <form onSubmit={handleCheckout}>
              {cart.map(item => (
                <React.Fragment key={item.id}>
                  <input type="hidden" name={`products[${item.id}][id]`} value={item.id} />
                  <input type="hidden" name={`products[${item.id}][quantity]`} value={item.quantity} />
                </React.Fragment>
              ))}
              <div className="d-grid">
                <button 
                  className="w-100 btn btn-primary btn-lg" 
                  type="submit" 
                  data-bs-dismiss="offcanvas" // Atributo que cierra el modal
                >
                  Continuar con el pago
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const CartNumber = () => {
  const { cart } = useCart();
  return (
    <>
      <a href="none" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart"> 
        <iconify-icon icon="mdi:cart" className="fs-4 position-relative"></iconify-icon>
        <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
          {cart.length}
        </span>
      </a>
    </>
  );
}

export default Cart;
export { CartNumber };
