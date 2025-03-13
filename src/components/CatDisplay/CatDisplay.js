import React, { useContext, useEffect, useState } from "react";
import "./CatDisplay.css";
import { BiTrash, BiX } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const CatDisplay = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from localStorage when component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Function to remove a specific item
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart!");
  };

  // Function to clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.info("Cart cleared!");
  };

  return (
    <div className="CatDisplayWrapper" onClick={onClose}>
      <div className="CatDisplayContainer" onClick={(e) => e.stopPropagation()}>
        <div className="BtnCancel">
          <p onClick={handleClearCart}>
            <BiTrash size={22} color="#333" /> clear cart
          </p>
          <BiX size={22} onClick={onClose} />
        </div>

        <div className="CartDisplay">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.productName} className="cart-img" />
                <div className="cart-details">
                  <h4>{item.productName}</h4>
                  <p>₦ {new Intl.NumberFormat().format(item.price)}</p>
                  <p>Qty: {item.quantity}</p>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </div>

        <div className="CatDisplayBtn">
          <button className="trans" onClick={onClose}>Continue Shopping</button>
          <button disabled={cartItems.length === 0 && !user}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CatDisplay;
