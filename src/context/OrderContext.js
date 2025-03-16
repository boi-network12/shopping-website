import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config/config";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // Create Order
    const createOrder = async (orderData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Order failed");

            setOrders((prev) => [...prev, data]);
            toast.success("Order placed successfully");
        } catch (error) {
            console.error("Order Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get Logged-in User's Orders
    const getUserOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setOrders(data);
        } catch (error) {
            console.error("Fetch Orders Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get All Orders (Admin only)
    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setOrders(data);
        } catch (error) {
            console.error("Admin Fetch Orders Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Update Order Status (Admin only)
    const updateOrderStatus = async (orderId, status) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setOrders((prev) =>
                prev.map((order) => (order._id === orderId ? { ...order, status } : order))
            );
            toast.success("Order status updated");
        } catch (error) {
            console.error("Update Status Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete Order (Admin only)
    const deleteOrder = async (orderId) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setOrders((prev) => prev.filter((order) => order._id !== orderId));
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error("Delete Order Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get All Transactions (Admin only)
    const getAllTransactions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/transactions`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setTransactions(data); // Set transactions state
        } catch (error) {
            console.error("Fetch Transactions Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get Logged-in User's Transactions
    const getUserTransactions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/transactions/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setTransactions(data); // Set transactions state
        } catch (error) {
            console.error("Fetch User Transactions Error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider 
            value={{ 
                 orders, 
                 transactions,
                 loading, 
                 createOrder, 
                 getUserOrders, 
                 getAllOrders, 
                 updateOrderStatus, 
                 deleteOrder ,
                 getAllTransactions,
                 getUserTransactions
            }}>
            {children}
        </OrderContext.Provider>
    );
};
