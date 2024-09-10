import React from 'react';

const Cart = () => {
    return (
        <>
           <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
            <div className="offcanvas-header justify-content-center">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
            <div className="order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tú carrito</span>
                <span className="badge bg-primary rounded-circle pt-2">3</span>
                </h4>
                <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 className="my-0">Grey Hoodie</h6>
                    <small className="text-body-secondary">Brief description</small>
                    </div>
                    <span className="text-body-secondary">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 className="my-0">Dog Food</h6>
                    <small className="text-body-secondary">Brief description</small>
                    </div>
                    <span className="text-body-secondary">$8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 className="my-0">Soft Toy</h6>
                    <small className="text-body-secondary">Brief description</small>
                    </div>
                    <span className="text-body-secondary">$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Total (USD)</span>
                    <strong>$20</strong>
                </li>
                </ul>

                <button className="w-100 btn btn-primary btn-lg" type="submit">Continuar con el pago</button>
            </div>
            </div>
        </div>
        </>
    )
}

const CartNumber = () => {
    return (
        <>
            <a href="javascript;" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                <iconify-icon icon="mdi:cart" className="fs-4 position-relative"></iconify-icon>
                <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                03
                </span>
            </a>
        </>
    )
}

export default Cart;
export { CartNumber };