import React, { useContext, useEffect } from 'react';
import { BiStar } from 'react-icons/bi';
import { OrderContext } from '../../context/OrderContext';
import './Transactions.css'; // Assuming you have a CSS file for styling

const Transactions = ({ searchQuery }) => {
    const { getUserTransactions, transactions } = useContext(OrderContext);

    useEffect(() => {
        getUserTransactions();
    }, [getUserTransactions]);

    const filteredTransactions = transactions.filter(transaction => 
        transaction._id.includes(searchQuery) || 
        transaction.type.includes(searchQuery)
    );

    return (
        <div className='AccountDetailsWrapper'>
            <div className='ShowCase'>
                <BiStar size={50} color='#148114' />
                <div>
                    <h2>Transactions REVIEWS</h2>
                    <p>View your transactions</p>
                </div>
            </div>
            <div className='TransactionsList'>
                {filteredTransactions.map((transaction) => (
                    <div key={transaction._id} className='TransactionCard'>
                        <div className='TransactionHeader'>
                            <h3>Transaction ID: {transaction._id}</h3>
                            <span className={`StatusBadge ${transaction.status}`}>
                                {transaction.status}
                            </span>
                        </div>
                        <div className='TransactionDetails'>
                            <p><strong>Amount:</strong> ₦{new Intl.NumberFormat().format(transaction.amount)}</p>
                            <p><strong>Type:</strong> {transaction.type}</p>
                            <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                            <p><strong>Created By:</strong> {transaction.createdBy}</p>
                            <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;