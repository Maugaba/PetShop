import React, { useState } from 'react';

const OrderTracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    // Datos "quemados" de seguimiento
    const shipmentData = [
        {
            id: 1,
            shipment_id: 3,
            tracking_number: "TRACK123456",
            status: "Pendiente de Recolectar",
            update_details: "Pedido creado y pendiente de recolección.",
            created_at: "2024-11-02T19:38:41",
            updated_at: "2024-11-02T19:38:41"
        },
        // Agrega más objetos aquí si tienes más números de guía
    ];

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleTrackOrder = () => {
        // Busca en los datos quemados el número de seguimiento ingresado
        const foundOrder = shipmentData.find(order => order.tracking_number === trackingNumber);

        if (foundOrder) {
            setOrderDetails(foundOrder);
            setError('');
        } else {
            setOrderDetails(null);
            setError('No se pudo encontrar el pedido. Verifique el número de guía.');
        }
    };

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
                    margin-top: 10px;
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
            <input
                type="text"
                value={trackingNumber}
                onChange={handleInputChange}
                placeholder="Número de guía"
            />
            <button onClick={handleTrackOrder}>Ver Estado</button>
            {error && <div className="error">{error}</div>}
            {orderDetails && (
                <div className="order-details">
                    <h3>Detalles del Pedido</h3>
                    <p><strong>Número de Seguimiento:</strong> {orderDetails.tracking_number}</p>
                    <p><strong>Estado:</strong> {orderDetails.status}</p>
                    <p><strong>Detalles de Actualización:</strong> {orderDetails.update_details}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(orderDetails.created_at).toLocaleString()}</p>
                    <p><strong>Última Actualización:</strong> {new Date(orderDetails.updated_at).toLocaleString()}</p>
                </div>
            )}
            <a href="/orders" className="back-button">Volver a Mis Pedidos</a>
        </div>
    );
};

export default OrderTracking;
