import React, { useState, useEffect, useContext } from "react";
import "./Transactions.css";
import { BiSearch, BiCheckCircle, BiXCircle, BiTimeFive } from "react-icons/bi";
import { OrderContext } from "../../context/OrderContext";

const Transactions = () => {
  const { transactions, getAllTransactions } = useContext(OrderContext); // Use context
  const [searchTerm, setSearchTerm] = useState("");
  const [loading] = useState(false);

  // Fetch all transactions on component mount
  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status icon based on transaction status
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
        <h2 className="transactions-title">Transactions</h2>
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

      {loading ? (
        <p className="loading">Loading transactions...</p>
      ) : (
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
                <tr key={transaction._id}>
                  <td>{transaction.sender}</td>
                  <td>{transaction.recipient}</td>
                  <td>${transaction.amount}</td>
                  <td className="status-cell">
                    {getStatusIcon(transaction.status)}
                    {transaction.status}
                  </td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;