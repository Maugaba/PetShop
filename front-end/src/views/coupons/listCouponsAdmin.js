import React, { useState, useEffect } from 'react'; 
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl from '../../api/apiUrl';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Cupones</h2>
        </div>
      </div>
    </section>
  );
};

const AddCouponModal = ({ show, handleClose, refreshCoupons, editingCoupon, setEditingCoupon }) => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_amount: '',
    valid_from: '',
    valid_to: '',
    discount_type: '',
  });

  useEffect(() => {
    if (editingCoupon) {
      setFormData({
        code: editingCoupon.code,
        description: editingCoupon.description,
        discount_amount: editingCoupon.discount_amount,
        valid_from: moment(editingCoupon.valid_from).format('YYYY-MM-DD'),
        valid_to: moment(editingCoupon.valid_to).format('YYYY-MM-DD'),
        discount_type: editingCoupon.discount_type,
      });
    } else {
      setFormData({
        code: '',
        description: '',
        discount_amount: '',
        valid_from: '',
        valid_to: '',
        discount_type: '',
      });
    }
  }, [editingCoupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      valid_from: moment(formData.valid_from).format('YYYY-MM-DD HH:mm:ss'),
      valid_to: moment(formData.valid_to).format('YYYY-MM-DD HH:mm:ss'),
    };

    if (editingCoupon) {
      axios.post(`${apiUrl}/coupons/${editingCoupon.id}`, formattedData)
        .then((response) => {
          Swal.fire('Actualizado', 'El cupón ha sido actualizado exitosamente.', 'success');
          handleClose();
          setEditingCoupon(null);
          refreshCoupons();
        })
        .catch((error) => {
          Swal.fire('Error', 'Hubo un problema al actualizar el cupón: ' + error.message, 'error');
        });
    } else {
      axios.post(`${apiUrl}/coupons`, formattedData)
        .then((response) => {
          Swal.fire('Creado', 'El cupón ha sido creado exitosamente.', 'success');
          handleClose();
          refreshCoupons();
        })
        .catch((error) => {
          Swal.fire('Error', 'Hubo un problema al crear el cupón: ' + error.message, 'error');
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingCoupon ? 'Editar Cupón' : 'Agregar Nuevo Cupón'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCouponCode">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Código del cupón"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCouponDiscount">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  name="discount_amount"
                  value={formData.discount_amount}
                  onChange={handleChange}
                  placeholder="Monto de descuento"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCouponDiscountType">
                <Form.Label>Tipo de Descuento</Form.Label>
                <Form.Control
                  as="select"
                  name="discount_type"
                  value={formData.discount_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Monto Fijo</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCouponValidFrom">
                <Form.Label>Válido desde</Form.Label>
                <Form.Control
                  type="date"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCouponValidTo">
                <Form.Label>Válido hasta</Form.Label>
                <Form.Control
                  type="date"
                  name="valid_to"
                  value={formData.valid_to}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Button variant="primary" type="submit">
            {editingCoupon ? 'Actualizar Cupón' : 'Guardar Cupón'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const handleDeactivate = (id, refreshCoupons) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas desactivar este cupón?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, desactivar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(`${apiUrl}/coupons/change-status/${id}`)
        .then(response => {
          Swal.fire('Desactivado', 'El cupón ha sido desactivado.', 'success');
          refreshCoupons();
        })
        .catch(error => {
          Swal.fire('Error', 'Hubo un problema al desactivar el cupón.', 'error');
        });
    }
  });
};

const ListCouponsAdmin = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = () => {
    axios
      .get(`${apiUrl}/coupons`)
      .then((response) => {
        console.log("Coupons fetched:", response.data);
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching coupons:', error);
      });
  };

  const handleShowModal = () => {
    setEditingCoupon(null);
    setShowModal(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <BannerSection />
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleShowModal}>
            Agregar Cupón
          </Button>
        </div>
        <DataTable
          title="Listado de Cupones"
          columns={[
            { name: 'Código', selector: (row) => row.code, sortable: true },
            { name: 'Descuento', selector: (row) => row.discount_amount, sortable: true },
            { name: 'Válido desde', selector: (row) => row.valid_from, sortable: true },
            { name: 'Válido hasta', selector: (row) => row.valid_to, sortable: true },
            { 
              name: 'Estado', 
              selector: row => {
                console.log("Row state:", row.is_active);
                return row.is_active ? 'Activo' : 'Inactivo';
              },
              sortable: true 
            },
            {
              name: 'Acciones',
              cell: (row) => (
                <div>
                  <Button variant="link" onClick={() => handleDeactivate(row.id, fetchCoupons)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                  <Button variant="link" className="ms-2" onClick={() => handleEditCoupon(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </div>
              ),
            },
          ]}
          data={coupons}
        />
        <AddCouponModal
          show={showModal}
          handleClose={handleCloseModal}
          refreshCoupons={fetchCoupons}
          editingCoupon={editingCoupon}
          setEditingCoupon={setEditingCoupon}
        />
      </div>
    </>
  );
};

export default ListCouponsAdmin;
