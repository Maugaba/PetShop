import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl from '../../api/apiUrl'; 
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BannerSection = () => (
  <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
    <div className="container">
      <div className="hero-content py-5 my-3">
        <h2 className="display-1 mt-3 mb-0">Administrar Categorías</h2>
      </div>
    </div>
  </section>
);

const AddCategoryModal = ({ show, handleClose, refreshCategories, editingCategory, setEditingCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = editingCategory 
      ? `${apiUrl}/categories/${editingCategory.id}` // Usar PUT para actualizar
      : `${apiUrl}/categories`; // Usar POST para crear una nueva categoría

    const method = editingCategory ? 'put' : 'post'; // Cambiar a PUT si es actualización

    axios[method](endpoint, formData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      const action = editingCategory ? 'actualizada' : 'creada';
      Swal.fire(action.charAt(0).toUpperCase() + action.slice(1), `La categoría ha sido ${action} exitosamente.`, 'success');
      handleClose();
      setEditingCategory(null);
      refreshCategories();
    })
    .catch((error) => {
      Swal.fire('Error', `Hubo un problema al ${editingCategory ? 'actualizar' : 'crear'} la categoría: ` + error.message, 'error');
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</Modal.Title>
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
            {editingCategory ? 'Actualizar Categoría' : 'Guardar Categoría'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Cambiar el estado activo/inactivo de la categoría
const handleToggleState = (category, refreshCategories) => {
  Swal.fire({
    title: `¿Estás seguro?`,
    text: `¿Deseas ${category.state ? 'desactivar' : 'activar'} esta categoría?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Sí, ${category.state ? 'desactivar' : 'activar'}`,
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(`${apiUrl}/categories/change-status/${category.id}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
        Swal.fire('Actualizado', `La categoría ha sido ${category.state ? 'desactivada' : 'activada'} exitosamente.`, 'success');
        refreshCategories();
      })
      .catch(error => {
        Swal.fire('Error', `Hubo un problema al cambiar el estado de la categoría.`, 'error');
      });
    }
  });
};

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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

  const handleShowModal = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

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
            { name: 'Descripción', selector: row => row.description, sortable: true },
            { 
              name: 'Estado', 
              selector: row => row.state === 1 ? 'Activo' : 'Inactivo', 
              sortable: true 
            },
            {
              name: 'Acciones',
              cell: row => (
                <div>
                  <Button variant="link" onClick={() => handleToggleState(row, fetchCategories)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                  <Button variant="link" className="ms-2" onClick={() => handleEditCategory(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </div>
              )
            }
          ]}
          data={categories}
        />
        <AddCategoryModal
          show={showModal}
          handleClose={handleCloseModal}
          refreshCategories={fetchCategories}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
        />
      </div>
    </>
  );
};

export default ListCategoriesAdmin;
