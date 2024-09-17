import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl from '../../api/apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Productos</h2>
          <nav className="breadcrumb">
            <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
            <span className="breadcrumb-item active" aria-current="page">Listado de productos</span>
          </nav>
        </div>
      </div>
    </section>
  );
}

const AddProductModal = ({ show, handleClose, refreshProducts, editingProduct, setEditingProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    specifications: '',
    images: [],
    videos: [],
    stock: '',
    price: '',
    discount: '',
    category: ''
  });

  useEffect(() => {
    if (editingProduct) {
      console.log(editingProduct);
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        specifications: editingProduct.specifications,
        stock: editingProduct.stock,
        price: editingProduct.price,
        discount: editingProduct.discount,
        category: editingProduct.product_categorie_id,
        images: [],
        videos: []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        specifications: '',
        images: [],
        videos: [],
        stock: '',
        price: '',
        discount: '',
        category: ''
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: Array.from(files)
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataSend = new FormData();
    formDataSend.append('name', formData.name);
    formDataSend.append('description', formData.description);
    formDataSend.append('specifications', formData.specifications);
    formDataSend.append('stock', formData.stock);
    formDataSend.append('price', formData.price);
    formDataSend.append('discount', formData.discount);
    formDataSend.append('category', formData.category);

    if (formData.images.length > 0) {
      formData.images.forEach((image) => {
        formDataSend.append('images[]', image);
      });
    }

    if (formData.videos.length > 0) {
      formData.videos.forEach((video) => {
        formDataSend.append('videos[]', video);
      });
    }

    if (editingProduct) {
      // Actualizar producto existente
      axios.post(`${apiUrl}/products/${editingProduct.id}`, formDataSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        Swal.fire('Actualizado', 'El producto ha sido actualizado exitosamente.', 'success');
        handleClose();
        setEditingProduct(null);
        refreshProducts();
      })
      .catch((error) => {
        Swal.fire('Error', 'Hubo un problema al actualizar el producto: ' + error.message, 'error');
      });
    } else {
      // Crear nuevo producto
      axios.post(`${apiUrl}/products`, formDataSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        Swal.fire('Creado', 'El producto ha sido creado exitosamente.', 'success');
        handleClose();
        refreshProducts();
      })
      .catch((error) => {
        Swal.fire('Error', 'Hubo un problema al crear el producto: ' + error.message, 'error');
      });
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descripción del producto"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <Form.Group controlId="formProductSpecifications">
                <Form.Label>Especificaciones</Form.Label>
                <Form.Control
                  type="text"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="Especificaciones del producto"
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductImages">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={handleChange}
                  multiple
                  accept="image/*"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductVideos">
                <Form.Label>Videos</Form.Label>
                <Form.Control
                  type="file"
                  name="videos"
                  onChange={handleChange}
                  multiple
                  accept="video/*"
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock del producto"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Precio del producto"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProductDiscount">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Descuento en porcentaje (si tiene)"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control as="select" name="category" onChange={handleChange} value={formData.category || ''} required>
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button variant="primary" type="submit">
            {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const handleDeactivate = (id, refreshProducts) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas desactivar este producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, desactivar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(`${apiUrl}/products/change-status/${id}`)
        .then(response => {
          Swal.fire('Desactivado', 'El producto ha sido desactivado.', 'success');
          refreshProducts();
        })
        .catch(error => {
          Swal.fire('Error', 'Hubo un problema al desactivar el producto.', 'error');
        });
    }
  });
};

const ListProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(`${apiUrl}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleShowModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <BannerSection />
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleShowModal}>Agregar Producto</Button>
        </div>
        <DataTable
          title="Listado de Productos"
          columns={[
            { name: 'Nombre', selector: row => row.name, sortable: true },
            { name: 'Descripción', selector: row => row.description, sortable: true },
            { name: 'Especificaciones', selector: row => row.specifications, sortable: true },
            { name: 'Stock', selector: row => row.stock, sortable: true },
            { name: 'Precio', selector: row => row.price, sortable: true },
            { name: 'Descuento', selector: row => row.discount, sortable: true },
            { name: 'Categoría', selector: row => row.product_category, sortable: true },
            { name: 'Estado', selector: row => row.state ? 'Activo' : 'Inactivo', sortable: true },
            {
              name: 'Acciones',
              cell: row => (
                <div>
                  <Button variant="link" onClick={() => handleDeactivate(row.id, fetchProducts)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                  <Button variant="link" className="ms-2" onClick={() => handleEditProduct(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </div>
              )
            }
          ]}
          data={products}
        />
        <AddProductModal
          show={showModal}
          handleClose={handleCloseModal}
          refreshProducts={fetchProducts}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      </div>
    </>
  );
}

export default ListProductsAdmin;




