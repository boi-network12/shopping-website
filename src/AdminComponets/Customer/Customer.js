import React from 'react';
import { BiTrash } from 'react-icons/bi';
import "./Customer.css";

const customers = [
    { id: 1, name: "John Doe", email: "johndoe@example.com", dateJoined: "2023-06-10", country: "USA", state: "California" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", dateJoined: "2022-09-15", country: "Canada", state: "Ontario" },
    { id: 3, name: "Samuel Lee", email: "samuellee@example.com", dateJoined: "2024-01-20", country: "UK", state: "London" },
];

const Customer = () => {
    return (
        <div className="customer-container">
            <h2 className="customer-title">Customers</h2>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date Joined</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td><input type="checkbox" /></td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.dateJoined}</td>
                            <td>{customer.country}</td>
                            <td>{customer.state}</td>
                            <td className="delete-icon"><BiTrash /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customer;