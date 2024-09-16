import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../../api/apiUrl';
import { useCart } from '../../context/CartContext';

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
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [error, setError] = useState(null); 

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(apiUrl + '/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      });
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.product_categorie_id === parseInt(selectedCategory) : true) &&
      (priceRange === "Menos de Q10" ? product.price < 10 :
       priceRange === "Q10 - Q20" ? product.price >= 10 && product.price <= 20 :
       priceRange === "Q20 - Q30" ? product.price > 20 && product.price <= 30 :
       priceRange === "Q30 - Q40" ? product.price > 30 && product.price <= 40 :
       priceRange === "Mas de Q40" ? product.price > 40 :
       priceRange === "Todos" ? true : true)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === 'price-asc') {
      return a.price - b.price;
    } else if (sortOrder === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="shopify-grid">
      <BannerSection />
      <div className="container py-5 my-5">
        <div className="row flex-md-row-reverse g-md-5 mb-5">
          <main className="col-md-9">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="filter-shop d-md-flex justify-content-between align-items-center">
              <div className="showing-product">
                <p className="m-0">Mostrando {sortedProducts.length} productos</p>
              </div>

              <div className="sort-order">
                <select 
                  className="form-select" 
                  onChange={(e) => setSortOrder(e.target.value)} 
                  value={sortOrder}
                >
                  <option value="">Ordenar por</option>
                  <option value="name-asc">Nombre A-Z</option>
                  <option value="name-desc">Nombre Z-A</option>
                  <option value="price-asc">Precio bajo-alto</option>
                  <option value="price-desc">Precio alto-bajo</option>
                </select>
              </div>
            </div>
            <div className="product-grid row">
              {sortedProducts.map((product) => (
                <div className="col-md-4 my-4" key={product.id}>
                  <div 
                    className="card position-relative" 
                    style={{ height: '100%', width: '100%' }} 
                  >
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={`http://localhost:8000/images/${product.images}`} 
                        className="img-fluid" 
                        alt={product.name} 
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover', 
                          borderRadius: '0'   
                        }} 
                      />
                    </Link>
                    <div className="card-body p-0">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="card-title pt-4 m-0">{product.name}</h3>
                      </Link>
                      <div className="card-text">
                        <h3 className="secondary-font text-primary">Q{product.price}</h3>
                        <div className="d-flex flex-wrap mt-3">
                          <button 
                            className="btn-cart me-3 px-4 pt-3 pb-3"
                            onClick={() => addToCart(product)}
                          >
                            <h5 className="text-uppercase m-0">Añadir al carrito</h5>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside className="col-md-3 mt-5">
            <div className="sidebar">
              <div className="widget-search-bar">
                <div className="search-bar border rounded-2 border-dark-subtle pe-3">
                  <form id="search-form" className="text-center d-flex align-items-center">
                    <input 
                      type="text" 
                      className="form-control border-0 bg-transparent" 
                      placeholder="Buscar por producto" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                    </svg>
                  </form>
                </div>
              </div>

              <div className="widget-product-categories pt-5">
                <h4 className="widget-title">Categorías</h4>
                <ul className="product-categories sidebar-list list-unstyled">
                  {[{ name: 'Todas', id: '' }, { name: 'Electrónica', id: 1 }, { name: 'Ropa', id: 2 }, { name: 'Hogar', id: 3 }]
                    .map((cat) => (
                      <li className={`cat-item ${selectedCategory === cat.id.toString() ? 'selected' : ''}`} key={cat.id}>
                        <Link 
                          to="#" 
                          onClick={() => setSelectedCategory(cat.id.toString())} 
                          style={{ textDecoration: selectedCategory === cat.id.toString() ? 'underline' : 'none' }}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="widget-price-filter pt-3">
                <h4 className="widget-title">Filtrar por precio</h4>
                <ul className="product-tags sidebar-list list-unstyled">
                  {['Todos', 'Menos de Q10', 'Q10 - Q20', 'Q20 - Q30', 'Q30 - Q40', 'Mas de Q40']
                    .map((range) => (
                      <li className={`tags-item ${priceRange === range ? 'selected' : ''}`} key={range}>
                        <Link 
                          to="#" 
                          onClick={() => setPriceRange(range)} 
                          style={{ textDecoration: priceRange === range ? 'underline' : 'none' }}
                        >
                          {range}
                        </Link>
                      </li>
                    ))}
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
