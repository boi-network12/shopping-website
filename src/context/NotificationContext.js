// NotificationContext.js
import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/notifications`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            const data = await response.json();
            if (response.ok) {
                setNotifications(data);
                return data; // Return the fetched data
            } else {
                toast.error(data.message);
                return []; // Return an empty array on error
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
            return []; // Return an empty array if an error occurs
        } finally {
            setLoading(false);
        }
    };
    

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/notifications/${id}/read`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                setNotifications((prev) => prev.map(n => n._id === id ? { ...n, read: true } : n));
            }
        } catch (error) {
            console.error("Error marking notification as read", error);
        }
    };

    const deleteNotifications = async (ids) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`${API_URL}/notifications`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ids })
            });
            
            setNotifications((prev) => prev.filter(n => !ids.includes(n._id)));
            toast.success("Delete is successfully!");
        } catch (error) {
            console.error("Error deleting notifications", error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, loading, fetchNotifications, markAsRead, deleteNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}