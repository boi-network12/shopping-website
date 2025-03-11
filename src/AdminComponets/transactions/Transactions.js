import React, { useState } from "react";
import "./Transactions.css";
import { BiSearch, BiCheckCircle, BiXCircle, BiTimeFive } from "react-icons/bi";

const initialTransactions = [
  { id: 1, sender: "John Doe", recipient: "Jane Smith", amount: 500, status: "Completed", date: "2025-03-10" },
  { id: 2, sender: "Alice Brown", recipient: "Mark Wilson", amount: 250, status: "Pending", date: "2025-03-09" },
  { id: 3, sender: "David Lee", recipient: "Chris Evans", amount: 1000, status: "Failed", date: "2025-03-08" },
  { id: 4, sender: "Sarah Connor", recipient: "Tom Hardy", amount: 700, status: "Completed", date: "2025-03-07" },
];

const Transactions = () => {
  const [transactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <BiCheckCircle className="status-icon completed" />;
      case "Pending":
        return <BiTimeFive className="status-icon pending" />;
      case "Failed":
        return <BiXCircle className="status-icon failed" />;
      default:
        return null;
    }
  };

  

  return (
    <div className="transactions-container">
      <div className="header">
        <h2 className="transactions-title" >Transactions</h2>
        <div className="search-bar">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.sender}</td>
                <td>{transaction.recipient}</td>
                <td>${transaction.amount}</td>
                <td className="status-cell">
                  {getStatusIcon(transaction.status)}
                  {transaction.status}
                </td>
                <td>{transaction.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
