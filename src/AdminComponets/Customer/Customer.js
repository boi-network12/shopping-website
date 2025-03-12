import React, { useContext, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import "./Customer.css";
import { AuthContext } from '../../context/AuthContext';

const Customer = () => {
    const { user, getAllUsers } = useContext(AuthContext);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            if (user && user.role === "admin") {
                const users = await getAllUsers();
                if (users.success) {
                    setCustomers(users.users);
                }
            }
        };

        fetchCustomers();
    }, [user, getAllUsers]);

    if (!user || user.role !== "admin") {
        return <p className="error-message">Access Denied: Admins only.</p>;
    }

    return (
        <div className="customer-container">
            <h2 className="customer-title">Customers</h2>
            <p className="customer-count">Total Customers: {customers.length}</p>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Date Joined</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer._id}>
                                <td><input type="checkbox" /></td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.role}</td>
                                <td>{customer.phone || "N/A"}</td>
                                <td>{customer.country}</td>
                                <td>{customer.state || "N/A"}</td>
                                <td>{customer.city || "N/A"}</td>
                                <td>{customer.address || "N/A"}</td>
                                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                <td className="delete-icon"><BiTrash /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Customer;
