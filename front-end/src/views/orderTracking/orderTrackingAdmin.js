import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../api/apiUrl';
import Swal from 'sweetalert2';

const OrderTrackingAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get(`${apiUrl}/shipments`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleStatusChange = (orderId, newStatus) => {
    axios.post(`${apiUrl}/shipment_tracking/update/${orderId}`, { status: newStatus })
      .then(() => {
        Swal.fire('Actualizado', 'El estado del pedido ha sido actualizado.', 'success');
        fetchOrders(); // Refresca la lista de pedidos
      })
      .catch(error => {
        Swal.fire('Error', 'Hubo un problema al actualizar el estado: ' + error.message, 'error');
      });
  };

  return (
    <div>
      <style jsx>{`
        h2 {
          font-family: Arial, sans-serif;
        }

        .order-container {
          margin: 20px;
        }

        .order {
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          background-color: #F9F3EC;
        }

        button {
          margin: 5px;
          padding: 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          color: white;
        }

        .pending {
          background-color: #ff9800; /* Color naranja */
        }

        .collected {
          background-color: #2196f3; /* Color azul */
        }

        .stored {
          background-color: #9c27b0; /* Color púrpura */
        }

        .delivering {
          background-color: #ffc107; /* Color amarillo */
        }

        .delivered {
          background-color: #4caf50; /* Color verde */
        }
      `}</style>

      <h2>Gestión de Pedidos</h2>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h3>{order.tracking_number}</h3>
          <p>Estado: {order.status}</p>
          <button className="pending" onClick={() => handleStatusChange(order.id, 'Pendiente de Recolectar')}>Pendiente</button>
          <button className="collected" onClick={() => handleStatusChange(order.id, 'Recolectado')}>Recolectado</button>
          <button className="stored" onClick={() => handleStatusChange(order.id, 'Almacenado')}>Almacenado</button>
          <button className="delivering" onClick={() => handleStatusChange(order.id, 'Ruta Entrega')}>Ruta Entrega</button>
          <button className="delivered" onClick={() => handleStatusChange(order.id, 'Entregado')}>Entregado</button>
        </div>
      ))}
    </div>
  );
};

export default OrderTrackingAdmin;
