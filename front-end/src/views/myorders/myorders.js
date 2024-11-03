import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import axios from 'axios';
import apiUrl from '../../api/apiUrl';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregado':
        return 'text-green-600';
      case 'En proceso':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="rounded-lg border p-4 mb-4" style={{ background: '#f9f3ec' }}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="bg-orange-100 p-2 rounded-lg mr-3">
            <Package className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Pedido #{order.id || 'N/A'}</p>
            <p className="text-gray-600">
              {order.details || 'Sin detalles'}
            </p>
            <p className="text-sm text-gray-500">
              Total Q {order.amount || '0'}
            </p>
            <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status || 'Pendiente'}
            </p>
          </div>
        </div>
        <Link 
          to={`/tracking/${order.id}`} 
          className="btn btn-outline-dark px-4 py-2 rounded hover:bg-gray-100"
        >
          Ver seguimiento
        </Link>
      </div>
    </div>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
          const response = await axios.get(`${apiUrl}/orders`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
      
          // Mapea los datos de ShipmentsTracking y Payments en un array de objetos orderData
          const ordersData = response.data.ShipmentsTracking.map((shipment, index) => ({
            id: shipment.tracking_number,
            details: shipment.update_details,
            amount: response.data.Payments[index]?.amount || 0, // Manejar el caso en el que no haya Payment correspondiente
            status: shipment.status
          }));
      
          setOrders(ordersData);
        } catch (error) {
          setError('Error al cargar los pedidos. Por favor, intenta nuevamente.');
          console.error('Error fetching orders:', error);
        }
      };
      
      fetchOrders();

    }, []);

  return (
    <div>
      <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
        <div className="container">
          <div className="hero-content py-5 my-3">
            <h2 className="display-1 mt-3 mb-0">Mis <span className="text-primary">Pedidos</span></h2>
            <nav className="breadcrumb">
              <Link className="breadcrumb-item nav-link" to="/">Inicio</Link>
              <span className="breadcrumb-item active" aria-current="page">Mis Pedidos</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="my-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 my-4">
              <h2 className="text-2xl font-semibold mb-4">Lista de Pedidos</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="text-sm text-gray-500 mb-2">
                Total pedidos: {orders?.length || 0}
              </div>
              <div className="space-y-4">
                {orders && orders.length > 0 ? (
                  orders.map(order => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p>No hay pedidos para mostrar. ({JSON.stringify(orders)})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-3xl font-bold">Gestiona tus pedidos con facilidad en Digital Paw.</h2>
            </div>
            <div className="col-md-6">
              <p className="mb-4">En Digital Paw, nos aseguramos de que puedas realizar un seguimiento de tus pedidos de manera sencilla y eficiente. Nuestra plataforma te permite ver el estado de tus pedidos en tiempo real.</p>
              <p>Si tienes alguna pregunta sobre tu pedido, nuestro equipo de atención al cliente está siempre dispuesto a ayudarte. Tu satisfacción es nuestra prioridad.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 py-5">
        <div className="container">
          <h2 className="text-2xl font-semibold text-primary mb-4">Política de Pedidos</h2>
          <p className="mb-2">✓ Procesamiento rápido: Nos esforzamos por procesar tu pedido en un plazo de 24 horas.</p>
          <p className="mb-2">✓ Envío seguro: Utilizamos servicios de envío confiables para asegurar que tu pedido llegue en perfectas condiciones.</p>
          <p className="mb-2">✓ Seguimiento en tiempo real: Te proporcionamos un número de seguimiento para que puedas rastrear tu pedido en todo momento.</p>
          <p>✓ Satisfacción garantizada: Si no estás satisfecho con tu pedido, contáctanos y haremos todo lo posible para solucionarlo.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;