// CodeTracking.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faWarehouse, faTruckLoading, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import apiUrl from '../../api/apiUrl';

const CodeTracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (trackingNumber) {
            try {
                console.log('apiUrl:', apiUrl); // Debería mostrar "https://backend-petshop.onrender.com/api"
                const response = await axios.get(apiUrl+`/track-order/${trackingNumber}`);
                setOrderDetails(response.data);
                setError('');
            } catch (err) {
                setOrderDetails(null);
                setError('No se pudo encontrar el pedido. Verifique el número de guía.');
            }
        }
    };

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

                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                }

                button:hover {
                    background-color: #0056b3;
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
            `}</style>

            <h2>Ingresar Número de Seguimiento</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={handleInputChange}
                    placeholder="Número de guía"
                />
                <button type="submit">Ver Estado</button>
            </form>

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
        </div>
    );
};

export default CodeTracking;
