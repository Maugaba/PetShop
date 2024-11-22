import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faWarehouse, faTruckLoading, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import apiUrl from '../../api/apiUrl';


const OrderTracking = () => {
    const { trackingNumber } = useParams(); // Obtén el número de seguimiento desde la URL
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(apiUrl+`/track-order/${trackingNumber}`);
                setOrderDetails(response.data);
                setError('');
            } catch (err) {
                setOrderDetails(null);
                setError('No se pudo encontrar el pedido. Verifique el número de guía.');
            }
        };

        fetchOrderDetails();
    }, [trackingNumber]);

    const getStatusIcon = (status, isActive) => {
        const iconProps = {
            style: {
                color: isActive ? '#4caf50' : '#333', // Verde si es el estado activo
                opacity: isActive ? 1 : 0.5,
                fontSize: '24px'
            }
        };

        switch (status) {
            case 'Pendiente de Recolectar':
                return <FontAwesomeIcon {...iconProps} icon={faClock} />;
            case 'Recolectado':
                return <FontAwesomeIcon {...iconProps} icon={faTruck} />;
            case 'Almacenado':
                return <FontAwesomeIcon {...iconProps} icon={faWarehouse} />;
            case 'Ruta Entrega / Bodega':
                return <FontAwesomeIcon {...iconProps} icon={faTruckLoading} />;
            case 'Entregado':
                return <FontAwesomeIcon {...iconProps} icon={faBoxOpen} />;
            default:
                return null;
        }
    };

    const steps = ["Pendiente de Recolectar", "Recolectado", "Almacenado", "Ruta Entrega / Bodega", "Entregado"];

    return (
        <div className="order-tracking">
            <style>{`
                .order-tracking {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                h2 {
                    text-align: center;
                    color: #333;
                }

                .error {
                    color: red;
                    text-align: center;
                    margin: 10px 0;
                }

                .order-details {
                    margin-top: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f3ec;
                }

                .status-steps {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                }

                .status-step {
                    text-align: center;
                    flex: 1;
                    color: #ccc;
                }

                .status-step.active {
                    color: #4caf50; /* Verde para el estado activo */
                    font-weight: bold;
                }

                .back-button {
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    display: inline-block;
                    padding: 10px 15px;
                    border-radius: 5px;
                    margin-top: 15px;
                    text-align: center;
                }

                .back-button:hover {
                    background-color: #0056b3;
                }
            `}</style>

            <h2>Seguimiento De Pedido</h2>
            {error && <div className="error">{error}</div>}
            {orderDetails && (
                <div className="order-details">
                    <h3>Detalles del Pedido</h3>
                    <p><strong>Número de Seguimiento:</strong> {orderDetails.tracking.tracking_number}</p>
                    <p><strong>Estado:</strong> {orderDetails.tracking.status}</p>
                    <p><strong>Detalles de Actualización:</strong> {orderDetails.tracking.update_details}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(orderDetails.shipment.created_at).toLocaleString()}</p>
                    <p><strong>Última Actualización:</strong> {new Date(orderDetails.tracking.updated_at).toLocaleString()}</p>

                    <div className="status-steps">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`status-step ${orderDetails.tracking.status === step ? 'active' : ''}`}
                            >
                                {getStatusIcon(step, orderDetails.tracking.status === step)}
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <a href="/myorders" className="back-button">Volver a Mis Pedidos</a>
        </div>
    );
};

export default OrderTracking;
