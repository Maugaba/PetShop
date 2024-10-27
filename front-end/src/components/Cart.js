import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Icon } from '@iconify/react'; 

const Cart = () => {
  const { cart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(productId, newQuantity);
  };

  const updatedTotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity || 0), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Navega a la vista de checkout con el carrito y el total actualizados
    navigate('/checkout', { state: { cart, total: updatedTotal } });
  };

  return (
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
              <strong>Q{updatedTotal.toFixed(2)}</strong>
            </li>
          </ul>

          <form onSubmit={handleCheckout}>
            {cart.map(item => (
              <React.Fragment key={item.id}>
                <input type="hidden" name={`products[${item.id}][id]`} value={item.id} />
                <input type="hidden" name={`products[${item.id}][name]`} value={item.name} />
                <input type="hidden" name={`products[${item.id}][quantity]`} value={item.quantity} />
              </React.Fragment>
            ))}
            <div className="d-grid">
              <button 
                className="w-100 btn btn-primary btn-lg" 
                type="submit" 
                data-bs-dismiss="offcanvas"
              >
                Continuar con el pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CartNumber = () => {
  const { cart } = useCart();

  return (
    <a href="none" className="mx-3 position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
      <Icon icon="f7:cart-fill" className="fs-4" />
      {cart.length > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {cart.length}
          <span className="visually-hidden">items en el carrito</span>
        </span>
      )}
    </a>
  );
}

export default Cart;
export { CartNumber };
