import React from 'react';
import Cart, {CartNumber} from './Cart';

const Header = () => {
  return (
    <>
    <div className="preloader-wrapper">
    <div className="preloader">
    </div>
    </div>

    <Cart />

    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasSearch"
        aria-labelledby="Search">
        <div className="offcanvas-header justify-content-center">
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">

        <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">
            Search
            </h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
            <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                <input type="text" className="form-control border-0 bg-transparent" placeholder="Search Here" />
                <iconify-icon icon="tabler:search" className="fs-4 me-3"></iconify-icon>
            </form>
            </div>
        </div>
        </div>
    </div>

    <header>
        <div className="container py-2">
        <div className="row py-4 pb-0 pb-sm-4 align-items-center ">

            <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
                <a href="index.html">
                <img src="images/logo.png" alt="logo" className="img-fluid"></img>
                </a>
            </div>
            </div>

            <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                <input type="text" className="form-control border-0 bg-transparent"
                    placeholder="Search for more than 10,000 products" />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                </svg>
                </form>
            </div>
            </div>

            <div
            className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <div className="support-box text-end d-none d-xl-block">
                <span className="fs-6 secondary-font text-muted">Phone</span>
                <h5 className="mb-0">+980-34984089</h5>
            </div>
            <div className="support-box text-end d-none d-xl-block">
                <span className="fs-6 secondary-font text-muted">Email</span>
                <h5 className="mb-0">waggy@gmail.com</h5>
            </div>



            </div>
        </div>
        </div>

        <div className="container-fluid">
        <hr className="m-0"></hr>
        </div>

        <div className="container">
        <nav className="main-menu d-flex navbar navbar-expand-lg ">

            <div className="d-flex d-lg-none align-items-end mt-3">
            <ul className="d-flex justify-content-end list-unstyled m-0">
                <li>
                <a href="account.html" className="mx-3">
                    <iconify-icon icon="healthicons:person" className="fs-4"></iconify-icon>
                </a>
                </li>
                <li>
                <a href="wishlist.html" className="mx-3">
                    <iconify-icon icon="mdi:heart" className="fs-4"></iconify-icon>
                </a>
                </li>

                <li>
                <a href="javascript;" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart">
                    <iconify-icon icon="mdi:cart" className="fs-4 position-relative"></iconify-icon>
                    <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                    03
                    </span>
                </a>
                </li>

                <li>
                <a href="javascript;" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch"
                    aria-controls="offcanvasSearch">
                    <iconify-icon icon="tabler:search" className="fs-4"></iconify-icon>
                </a>
                </li>
            </ul>

            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

            <div className="offcanvas-header justify-content-center">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body justify-content-between">
                <select className="filter-categories border-0 mb-0 me-5">
                <option>Shop by Category</option>
                <option>Clothes</option>
                <option>Food</option>
                <option>Food</option>
                <option>Toy</option>
                </select>

                <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
                <li className="nav-item">
                    <a href="index.html" className="nav-link active">Home</a>
                </li>
                <li className="nav-item dropdown">
                    <a href="javascript;" className="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown"
                    aria-expanded="false">Pages</a>
                    <ul className="dropdown-menu" aria-labelledby="pages">
                    <li><a href="about.html" className="dropdown-item">About Us<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="shop.html" className="dropdown-item">Shop<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="single-product.html" className="dropdown-item">Single Product<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="cart.html" className="dropdown-item">Cart<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="wishlist.html" className="dropdown-item">Wishlist<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="checkout.html" className="dropdown-item">Checkout<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="blog.html" className="dropdown-item">Blog<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="single-post.html" className="dropdown-item">Single Post<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="contact.html" className="dropdown-item">Contact<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="faqs.html" className="dropdown-item">FAQs<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="account.html" className="dropdown-item">Account<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="thank-you.html" className="dropdown-item">Thankyou<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="error.html" className="dropdown-item">Error 404<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    <li><a href="styles.html" className="dropdown-item">Styles<span
                            className="badge bg-success text-dark ms-2">PRO</span></a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="shop.html" className="nav-link">Shop</a>
                </li>
                <li className="nav-item">
                    <a href="blog.html" className="nav-link">Blog</a>
                </li>
                <li className="nav-item">
                    <a href="contact.html" className="nav-link">Contact</a>
                </li>
                <li className="nav-item">
                    <a href="javascript;" className="nav-link">Others</a>
                </li>
                <li className="nav-item">
                    <a href="https://templatesjungle.gumroad.com/l/waggy-pet-shop-ecommerce-html-website-template" className="nav-link fw-bold text-dark">GET PRO</a>
                </li>
                </ul>

                <div className="d-none d-lg-flex align-items-end">
                <ul className="d-flex justify-content-end list-unstyled m-0">
                    <li>
                    <a href="account.html" className="mx-3">
                        <iconify-icon icon="healthicons:person" className="fs-4"></iconify-icon>
                    </a>
                    </li>
                    <li>
                    <a href="wishlist.html" className="mx-3">
                        <iconify-icon icon="mdi:heart" className="fs-4"></iconify-icon>
                    </a>
                    </li>

                    <li className="">
                        <CartNumber />
                    </li>
                </ul>

                </div>

            </div>

            </div>

        </nav>



        </div>
    </header>
    </>
    );
};

export default Header;