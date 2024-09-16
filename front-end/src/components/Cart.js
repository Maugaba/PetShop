import React from 'react';
import { useCart } from '../context/CartContext'; 

const Cart = () => {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

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
                  </div>
                  <span className="text-body-secondary">Q{item.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Total (Q)</span>
                <strong>Q{formattedTotal}</strong>
              </li>
            </ul>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Continuar con el pago</button>
          </div>
        </div>
      </div>
    </>
  );
}

const CartNumber = () => {
  const { cart } = useCart(); 
  return (
    <>
      <a href="none" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart"> {/* deje esto como none solo para que no de advertencias*/}
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
