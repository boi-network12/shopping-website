import React, { useContext, useEffect } from 'react';
import { BiCartAlt } from 'react-icons/bi';
import { OrderContext } from '../../context/OrderContext';
import "./MyOrders.css"

const MyOrders = ({ searchQuery }) => {
  const { orders, getUserOrders } = useContext(OrderContext);

  useEffect(() => {
    getUserOrders()
  }, [ getUserOrders]);

  const filteredOrders = (orders || []).filter(order => 
    order?._id?.includes(searchQuery || '') || 
    order?.cartItems?.some(item => item?.productName?.includes(searchQuery || ''))
  );
  

  return (
    <div className='AccountDetailsWrapper'>
      <div className='ShowCase'>
        <BiCartAlt size={50} color='#148114' />
        <div>
          <h2>My Orders</h2>
          <p>Take a look at your recent orders and details</p>
        </div>
      </div>

      
        <div className='OrdersList'>
          {filteredOrders.map((order) => (
            <div key={order._id} className='OrderItem'>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Amount: ₦{new Intl.NumberFormat().format(order.totalAmount)}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Shipping Method: {order.shippingMethod}</p>
              <div>
                <h4>Products:</h4>
                {order.cartItems.map((item) => (
                  <div key={item.productId} className='ProductItem'>
                    <p>Name: {item.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₦{new Intl.NumberFormat().format(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default MyOrders;