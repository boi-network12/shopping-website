import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import { BiX, BiCheckCircle, BiTrash } from 'react-icons/bi';
import "./Notification.css";

const Notification = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const { fetchNotifications, markAsRead, deleteNotifications } = useContext(NotificationContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user?.role === "admin") {
            const loadNotifications = async () => {
                try {
                    const data = await fetchNotifications();
                    setNotifications(data || []);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                    setNotifications([]);
                }
            };
            loadNotifications();
        }
    }, [fetchNotifications, user]);

    if (!user || user.role !== "admin") {
        return (
            <div className='NotificationWrapper' onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className='NotificationBox'>
                    <div className="NotificationHeader">
                        <h3>Notifications</h3>
                        <BiX className="CloseIcon" onClick={onClose} />
                    </div>
                    <p className="NoAccess">Access Denied: Admins only</p>
                </div>
            </div>
        );
    }

    return (
        <div className='NotificationWrapper' onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className='NotificationBox'>
                <div className="NotificationHeader">
                    <h3>Notifications</h3>
                    <BiX className="CloseIcon" onClick={onClose} />
                </div>

                <div className="NotificationContent">
                    {notifications.length === 0 ? (
                        <p className="NoNotification">No new notifications</p>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif._id} className={`NotificationItem ${notif.read ? "Read" : "Unread"}`}>
                                <p><strong>{notif.title}</strong></p>
                                <p>{notif.message}</p>
                                <p className="Timestamp">{new Date(notif.createdAt).toLocaleString()}</p>
                                <div className="NotificationActions">
                                    {!notif.read && (
                                        <BiCheckCircle
                                            className="MarkAsRead"
                                            onClick={() => markAsRead(notif._id)}
                                        />
                                    )}
                                    <BiTrash
                                        className="DeleteIcon"
                                        onClick={() => deleteNotifications(notif._id)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
