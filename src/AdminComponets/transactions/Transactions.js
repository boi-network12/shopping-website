import React, { useState, useEffect, useContext } from "react";
import "./Transactions.css";
import { BiSearch, BiCheckCircle, BiXCircle, BiTimeFive } from "react-icons/bi";
import { OrderContext } from "../../context/OrderContext";

const Transactions = () => {
  const { transactions, getAllTransactions } = useContext(OrderContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading] = useState(false);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.createdBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <BiCheckCircle className="status-icon completed" />;
      case "pending":
        return <BiTimeFive className="status-icon pending" />;
      case "failed":
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
              <th>User Id</th>
              <th>Sender</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.createdBy}</td>
                  <td>₦{new Intl.NumberFormat().format(transaction.amount)}</td>
                  <td>{transaction.type}</td>
                  <td className="status-cell">
                    {getStatusIcon(transaction.status)}
                    {transaction.status}
                  </td>
                  <td>{transaction.createdBy}</td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
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