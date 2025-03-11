import React, { useState } from 'react';
import "./Orders.css";
import { BiInfoCircle } from "react-icons/bi";

const ordersData = [
    { id: 1, customer: "John Doe", email: "john@example.com", date: "2024-03-10", status: "Delivered", total: "$120", location: "New York, USA" },
    { id: 2, customer: "Jane Smith", email: "jane@example.com", date: "2024-03-09", status: "Processing", total: "$95", location: "London, UK" },
    { id: 3, customer: "Samuel Lee", email: "samuel@example.com", date: "2024-03-08", status: "Shipped", total: "$200", location: "Berlin, Germany" },
];

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="orders-container">
            <h2 className="orders-title">Orders</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData.map((order) => (
                        <tr key={order.id}>
                            <td><input type="checkbox" /></td>
                            <td>{order.customer}</td>
                            <td>{order.email}</td>
                            <td>{order.date}</td>
                            <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                            <td>{order.total}</td>
                            <td>
                                <BiInfoCircle className="info-icon" onClick={() => handleOpenModal(order)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Order Details</h3>
                        <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                        <p><strong>Email:</strong> {selectedOrder.email}</p>
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Total:</strong> {selectedOrder.total}</p>
                        <p><strong>Location:</strong> {selectedOrder.location}</p>
                        <button className="close-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
