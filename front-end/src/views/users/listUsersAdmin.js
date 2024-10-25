import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl from '../../api/apiUrl'; 
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const BannerSection = () => {
  return (
    <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">Usuarios</h2>
        </div>
      </div>
    </section>
  );
};

const AddUserModal = ({ show, handleClose, refreshUsers, editingUser, setEditingUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    role: 'client'
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        phone: editingUser.phone,
        address: editingUser.address,
        email: editingUser.email,
        password: '',
        role: editingUser.role_id === 1 ? 'admin' : 'client',
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        role: 'client'
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email.toLowerCase(), 
      password: formData.password,
      role_id: formData.role === 'admin' ? 1 : 2,
      state: true,
    };

    const endpoint = formData.role === 'client' ? 'client/register' : 'user/register';

    if (editingUser) {
      axios.post(`${apiUrl}/client/update/${editingUser.id}`, data)
        .then((response) => {
          Swal.fire('Actualizado', 'El usuario ha sido actualizado correctamente.', 'success');
          handleClose();
          refreshUsers();
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message;
          Swal.fire('Error', 'Hubo un problema al actualizar el usuario: ' + errorMessage, 'error');
        });
    } else {
      axios.post(`${apiUrl}/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        Swal.fire('Creado', `El usuario ha sido creado exitosamente como ${formData.role}.`, 'success');
        handleClose();
        refreshUsers();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        Swal.fire('Error', 'Hubo un problema al crear el usuario: ' + errorMessage, 'error');
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formUserName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del usuario"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formUserPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono del usuario"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formUserAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Dirección del usuario"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo del usuario"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formUserPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña del usuario"
                  required={!editingUser}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formUserRole">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="admin">Administrador</option>
                  <option value="client">Cliente</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-3">
            {editingUser ? 'Actualizar Usuario' : 'Guardar Usuario'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ListUsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const fetchClients = axios.get(`${apiUrl}/client/users`);
    const fetchAdmins = axios.get(`${apiUrl}/user/all`);

    Promise.all([fetchClients, fetchAdmins])
      .then(([clientsResponse, adminsResponse]) => {
        const allUsers = [...clientsResponse.data, ...adminsResponse.data];

        const uniqueUsers = allUsers.filter((user, index, self) =>
          index === self.findIndex((u) => u.id === user.id)
        );

        setUsers(uniqueUsers.map((user, index) => ({
          ...user, 
          uniqueKey: `${user.id}-${index}`
        })));
      })
      .catch((error) => {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      });
  };

  const handleShowModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleStatusChange = (id) => {
    axios.post(`${apiUrl}/user/change-status/${id}`)
      .then(() => {
        Swal.fire('Actualizado', 'El estado del usuario ha sido actualizado.', 'success');
        fetchUsers();
      })
      .catch((error) => {
        Swal.fire('Error', 'No se pudo actualizar el estado del usuario.', 'error');
      });
  };

  return (
    <>
      <BannerSection />
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleShowModal}>
            Agregar Usuario
          </Button>
        </div>
        <DataTable
          title="Listado de Usuarios"
          columns={[
            { name: 'Nombre', selector: (row) => row.name, sortable: true },
            { name: 'Teléfono', selector: (row) => row.phone, sortable: true },
            { name: 'Correo', selector: (row) => row.email, sortable: true },
            { name: 'Rol', selector: (row) => row.role_id === 1 ? 'Administrador' : 'Cliente', sortable: true },
            { name: 'Estado', selector: (row) => row.state ? 'Activo' : 'Inactivo', sortable: true }, 
            {
              name: 'Acciones',
              cell: (row) => (
                <div>
                  <Button variant="link" className="ms-2" onClick={() => handleEditUser(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="link" className="ms-2" onClick={() => handleStatusChange(row.id)}>
                    {row.state ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              ),
            },
          ]}
          data={users}
          keyField="uniqueKey"
        />
        <AddUserModal
          show={showModal}
          handleClose={handleCloseModal}
          refreshUsers={fetchUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      </div>
    </>
  );
};

export default ListUsersAdmin;
