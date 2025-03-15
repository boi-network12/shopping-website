import React, { useContext, useEffect, useState } from 'react';
import "./Orders.css";
import { BiInfoCircle, BiTrashAlt } from "react-icons/bi";
import { AuthContext } from '../../context/AuthContext';
import { OrderContext } from '../../context/OrderContext';
import { toast } from 'react-toastify';
import LoadingDots from '../../Loading/LoadingDots ';



const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { user } = useContext(AuthContext);
    const { orders, getAllOrders, updateOrderStatus } = useContext(OrderContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user && user.role === "admin") {
          getAllOrders(); // Fetch all orders when the component mounts
        }
      }, [user, getAllOrders])

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setLoading(true)
          await updateOrderStatus(orderId, newStatus);
          toast.success("Order status updated successfully");
        } catch (error) {
          toast.error("Failed to update order status");
        } finally {
            setLoading(false)
        }
      };
    
      if (loading) {
        return <LoadingDots/>
      }

    return (
        <div className="orders-container">
            <h2 className="orders-title">Orders</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Details</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{`${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`}</td>
                    <td>{order.shippingDetails.email}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                        <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        </select>
                    </td>
                    <td>₦{new Intl.NumberFormat().format(order.totalAmount)}</td>
                    <td>
                        <BiInfoCircle
                        className="info-icon"
                        onClick={() => handleOpenModal(order)}
                        />
                    </td>
                    <td>
                        <BiTrashAlt
                           className="info-icon"
                           color='red'
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="modal-overlay1" onClick={handleCloseModal}>
                <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
                    <h3>Order Details</h3>
                    <p>
                    <strong>Customer:</strong>{" "}
                    {`${selectedOrder.shippingDetails.firstName} ${selectedOrder.shippingDetails.lastName}`}
                    </p>
                    <p>
                    <strong>Email:</strong> {selectedOrder.shippingDetails.email}
                    </p>
                    <p>
                    <strong>Phone:</strong> {selectedOrder.shippingDetails.phone}
                    </p>
                    <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                    <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p>
                    <strong>Total:</strong> ₦
                    {new Intl.NumberFormat().format(selectedOrder.totalAmount)}
                    </p>
                    <p>
                        <strong>Note: </strong>
                        {selectedOrder.note}
                    </p>
                    <p>
                    <strong>Address:</strong> {selectedOrder.shippingDetails.address},{" "}
                    {selectedOrder.shippingDetails.city},{" "}
                    {selectedOrder.shippingDetails.state},{" "}
                    {selectedOrder.shippingDetails.country}
                    </p>
                    <h4>Products:</h4>
                    <ul>
                    {selectedOrder.cartItems.map((item, index) => (
                        <li key={index}>
                        <img src={item.image} alt={item.productName} width="50" />
                        <div>
                            <p>{item.productName}</p>
                            <p>Size: {item.selectedSize}, Color: {item.selectedColor}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₦{new Intl.NumberFormat().format(item.price)}</p>
                        </div>
                        </li>
                    ))}
                    </ul>
                    <button className="close-btn1" onClick={handleCloseModal}>
                    Close
                    </button>
                </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
