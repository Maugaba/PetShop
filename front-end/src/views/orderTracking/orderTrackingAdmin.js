import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faWarehouse, faTruckLoading, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import  { apiphotos } from '../../api/apiUrl';
import apiUrl from '../../api/apiUrl';
axios.defaults.baseURL =apiphotos;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const OrderTrackingAdmin = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(apiUrl+'/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
            Swal.fire('Error', 'No se pudieron obtener los pedidos.', 'error');
        }
    };

    const handleStatusChange = async (trackingNumber, newStatus) => {
        try {
            const response = await axios.put(`/api/update-order-status/${trackingNumber}`, { status: newStatus });
            Swal.fire('Actualizado', 'El estado del pedido ha sido actualizado.', 'success');
            fetchOrders(); // Refresca la lista de pedidos después de la actualización
        } catch (error) {
            console.error("Error al actualizar el estado:", error.response ? error.response.data : error.message);
            Swal.fire('Error', `Hubo un problema al actualizar el estado: ${error.response ? error.response.data.message : error.message}`, 'error');
        }
    };
    
  
    const getStatusIcon = (status, isActive, onClick) => {
        const iconProps = {
            onClick,
            style: {
                cursor: 'pointer',
                color: isActive ? '#4caf50' : '#333', // Verde si es el estado activo
                opacity: isActive ? 1 : 0.5,
                fontSize: '24px'
            }
        };

        switch (status) {
            case 'Pendiente de Recolectar':
                return React.createElement(FontAwesomeIcon, { ...iconProps, icon: faClock });
            case 'Recolectado':
                return React.createElement(FontAwesomeIcon, { ...iconProps, icon: faTruck });
            case 'Almacenado':
                return React.createElement(FontAwesomeIcon, { ...iconProps, icon: faWarehouse });
            case 'Ruta Entrega / Bodega':
                return React.createElement(FontAwesomeIcon, { ...iconProps, icon: faTruckLoading });
            case 'Entregado':
                return React.createElement(FontAwesomeIcon, { ...iconProps, icon: faBoxOpen });
            default:
                return null;
        }
    };

    return React.createElement(
        'div',
        { className: 'order-tracking-admin', style: { maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' } },
        React.createElement('h2', { style: { textAlign: 'center', fontSize: '1.8em', marginBottom: '20px' } }, 'Gestión de Pedidos'),
        React.createElement('p', null, `Total pedidos: ${orders.length}`),
        React.createElement(
            'div',
            { className: 'order-container', style: { marginTop: '20px' } },
            orders.length > 0
                ? orders.map(order => React.createElement(
                    'div',
                    { key: order.tracking_number, className: 'order', style: { border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' } },
                    React.createElement(
                        'div',
                        { className: 'status-icons', style: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' } },
                        ["Pendiente de Recolectar", "Recolectado", "Almacenado", "Ruta Entrega / Bodega", "Entregado"].map((status, index) => React.createElement(
                            'div',
                            { key: `${order.tracking_number}-${index}`, style: { textAlign: 'center', flex: '1' } },
                            React.createElement(
                                'div',
                                { className: `icon ${order.status === status ? 'active' : ''}`, style: { marginBottom: '5px' } },
                                getStatusIcon(status, order.status === status, () => handleStatusChange(order.tracking_number, status))
                            ),
                            React.createElement('p', null, status)
                        ))
                    ),
                    React.createElement('h3', null, `Pedido #${order.tracking_number}`),
                    React.createElement('p', null, React.createElement('strong', null, 'Estado Actual: '), order.status),
                    React.createElement('p', null, React.createElement('strong', null, 'Detalles de Actualización: '), order.update_details),
                    React.createElement('p', null, React.createElement('strong', null, 'Fecha de Creación: '), new Date(order.shipment.created_at).toLocaleString()),
                    React.createElement('p', null, React.createElement('strong', null, 'Última Actualización: '), new Date(order.updated_at).toLocaleString())
                ))
                : React.createElement('p', null, 'No hay pedidos para mostrar.')
        )
    );
};

export default OrderTrackingAdmin;
