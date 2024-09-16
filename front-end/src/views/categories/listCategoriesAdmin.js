import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl from '../../api/apiUrl'; // Ajusta el path si es necesario
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Administrar Categorías</h2>
        </div>
      </div>
    </section>
  );
};

const AddCategoryModal = ({ show, handleClose, refreshCategories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de crear una nueva categoría.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear categoría',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${apiUrl}/categories`, formData)
          .then((response) => {
            Swal.fire('Creada', 'La categoría ha sido creada exitosamente.', 'success');
            handleClose(); // Cierra el modal después de enviar
            refreshCategories(); // Actualiza la lista de categorías
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al crear la categoría: ' + error.message, 'error');
          });
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formCategoryName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre de la categoría"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="formCategoryDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descripción de la categoría"
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button variant="primary" type="submit">
            Guardar Categoría
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${apiUrl}/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <BannerSection />
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleShowModal}>Agregar Categoría</Button>
        </div>
        <DataTable
          title="Listado de Categorías"
          columns={[
            { name: 'Nombre', selector: row => row.name, sortable: true },
            { name: 'Descripción', selector: row => row.description, sortable: true }
          ]}
          data={categories}
        />
        <AddCategoryModal show={showModal} handleClose={handleCloseModal} refreshCategories={fetchCategories} />
      </div>
    </>
  );
};

export default ListCategoriesAdmin;
