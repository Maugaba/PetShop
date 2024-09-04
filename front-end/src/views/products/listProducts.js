import React from 'react';
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Productos</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
            <span className="breadcrumb-item active" aria-current="page">Productos</span>
          </nav>
        </div>
      </div>
    </section>
  );
}

const ListProducts = () => {
  return (
    <div className="shopify-grid">
      <BannerSection />
      <div className="container py-5 my-5">
        <div className="row flex-md-row-reverse g-md-5 mb-5">
          <main className="col-md-9">
            <div className="filter-shop d-md-flex justify-content-between align-items-center">
              <div className="showing-product">
                <p className="m-0">Mostrando 1-9 de 55 resultados</p>
              </div>
              <div className="sort-by">
                <select className="filter-categories border-0 m-0">
                  <option value="">Filtros</option>
                  <option value="">Nombre (A - Z)</option>
                  <option value="">Nombre (Z - A)</option>
                  <option value="">Precio (Bajo-Alto)</option>
                  <option value="">Price (Alto-Bajo)</option>
                </select>
              </div>
            </div>

            <div className="product-grid row">
              {[
                { src: "/images/item7.jpg", status: "", title: "Grey hoodie" },
                { src: "/images/item10.jpg", status: "Nuevo", title: "Grey hoodie" },
                { src: "/images/item5.jpg", status: "", title: "Grey hoodie" },
                { src: "/images/item8.jpg", status: "Vendido", title: "Grey hoodie" },
                { src: "/images/item13.jpg", status: "", title: "Grey hoodie" },
                { src: "/images/item14.jpg", status: "Venta", title: "Grey hoodie" },
                { src: "/images/item9.jpg", status: "Venta", title: "Grey hoodie" },
                { src: "/images/item16.jpg", status: "", title: "Grey hoodie" },
                { src: "/images/item2.jpg", status: "", title: "Grey hoodie" },
              ].map((product, index) => (
                <div className="col-md-4 my-4" key={index}>
                  {product.status && (
                    <div className="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                      {product.status}
                    </div>
                  )}
                  <div className="card position-relative">
                    <Link to="single-product.html">
                      <img src={product.src} className="img-fluid rounded-4" alt="product" />
                    </Link>
                    <div className="card-body p-0">
                      <Link to="single-product.html">
                        <h3 className="card-title pt-4 m-0">{product.title}</h3>
                      </Link>
                      <div className="card-text">

                        <h3 className="secondary-font text-primary">$18.00</h3>
                        <div className="d-flex flex-wrap mt-3">
                          <Link to="#" className="btn-cart me-3 px-4 pt-3 pb-3">
                            <h5 className="text-uppercase m-0">Añadir al carrito</h5>
                          </Link>
                          <Link to="#" className="btn-wishlist px-4 pt-3">
                            <iconify-icon icon="fluent:heart-28-filled" className="fs-5"></iconify-icon>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <nav className="navigation paging-navigation text-center mt-5" role="navigation">
              <div className="pagination loop-pagination d-flex justify-content-center align-items-center">
                <Link to="#" className="pagination-arrow d-flex align-items-center mx-3">
                  <iconify-icon icon="ic:baseline-keyboard-arrow-left" className="pagination-arrow fs-1"></iconify-icon>
                </Link>
                <span aria-current="page" className="page-numbers mt-2 fs-3 mx-3 current">1</span>
                <Link className="page-numbers mt-2 fs-3 mx-3" to="#">2</Link>
                <Link className="page-numbers mt-2 fs-3 mx-3" to="#">3</Link>
                <Link to="#" className="pagination-arrow d-flex align-items-center mx-3">
                  <iconify-icon icon="ic:baseline-keyboard-arrow-right" className="pagination-arrow fs-1"></iconify-icon>
                </Link>
              </div>
            </nav>
          </main>

          <aside className="col-md-3 mt-5">
            <div className="sidebar">
              <div className="widget-menu">
                <div className="widget-search-bar">
                  <div className="search-bar border rounded-2 border-dark-subtle pe-3">
                    <form id="search-form" className="text-center d-flex align-items-center" action="" method="">
                      <input type="text" className="form-control border-0 bg-transparent" placeholder="Buscar por producto" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                      </svg>
                    </form>
                  </div>
                </div>
              </div>
              <div className="widget-product-categories pt-5">
                <h4 className="widget-title">Categorias</h4>
                <ul className="product-categories sidebar-list list-unstyled">
                  <li className="cat-item"><Link to="/collections/categories">Todas</Link></li>
                  <li className="cat-item"><Link to="#" className="nav-link">Perros</Link></li>
                  <li className="cat-item"><Link to="#" className="nav-link">Comida</Link></li>
                  <li className="cat-item"><Link to="#" className="nav-link">Gatos</Link></li>
                  <li className="cat-item"><Link to="#" className="nav-link">Aves</Link></li>
                </ul>
              </div>
              <div className="widget-product-tags pt-3">
                <h4 className="widget-title">Etiquetas</h4>
                <ul className="product-tags sidebar-list list-unstyled">
                  <li className="tags-item"><Link to="#" className="nav-link">Mascotas</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Ropa</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Alimentos</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Juguetes</Link></li>
                </ul>
              </div>
              <div className="widget-product-brands pt-3">
                <h4 className="widget-title">Marcas</h4>
                <ul className="product-tags sidebar-list list-unstyled">
                  <li className="tags-item"><Link to="#" className="nav-link">Denim</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Puma</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Klaws</Link></li>
                </ul>
              </div>
              <div className="widget-price-filter pt-3">
                <h4 className="widget-title">Filtrar por precio</h4>
                <ul className="product-tags sidebar-list list-unstyled">
                  <li className="tags-item"><Link to="#" className="nav-link">Menos de $10</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">$10 - $20</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">$20 - $30</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">$30 - $40</Link></li>
                  <li className="tags-item"><Link to="#" className="nav-link">Mas de $40</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
