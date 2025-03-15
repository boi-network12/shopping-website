import React, { useContext, useEffect, useState } from "react";
import "./CatDisplay.css";
import { BiCart, BiTrash, BiTrashAlt, BiX } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CatDisplay = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from localStorage when component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Function to remove a specific item
  const handleRemoveItem = (uniqueId) => {
    const updatedCart = cartItems.filter((item) => item.uniqueId !== uniqueId);
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

  // Function to increase quantity for a specific item
  const handleIncrease = (uniqueId) => {
    const updatedCart = cartItems.map((item) =>
      item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const handleDecrease = (uniqueId) => {
    const updatedCart = cartItems.map((item) =>
      item.uniqueId === uniqueId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const handleCheckOutPage = (cartItems) => {
    // Clone cart items safely without any non-serializable objects
    const serializableCartItems = cartItems.map(({ uniqueId, productName, selectedColor, selectedSize, quantity, price, image }) => ({
      uniqueId, productName, selectedColor, selectedSize, quantity, price, image
    }));

    navigate(`/checkout`, { state: { cartItems: serializableCartItems } });
  }

  
  return (
    <div className="CatDisplayWrapper" onClick={onClose}>
      <div className="CatDisplayContainer" onClick={(e) => e.stopPropagation()}>
        <div className="BtnCancel">
          {cartItems.length > 0 && (
            <p onClick={handleClearCart}>
              <BiTrashAlt size={20} /> clear cart
            </p>
          )}
          <BiX size={22} onClick={onClose} />
        </div>

        <div className="CartDisplay">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="CartInfo">
                  <img src={item.image} alt={item.productName} className="cart-img" />
                  <h4>
                    <p>{item.productName}</p>
                    <span>color: {item.selectedColor} size: {item.selectedSize}</span>
                  </h4>
                </div>
                <div className="cart-details">
                  <div className="rightDiv">
                    <div className="Add-minus">
                      <button onClick={() => handleDecrease(item.uniqueId)} disabled={(item.quantity || 1) === 1}>-</button>
                      <input type="text" value={item.quantity || 1} readOnly />
                      <button onClick={() => handleIncrease(item.uniqueId)}>+</button>
                    </div>
                    <p>₦ {new Intl.NumberFormat().format(item.price)}</p>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.uniqueId)}><BiTrash /> Remove</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <BiCart size={70} />
              <p>Your cart is empty.</p>
              <span>Looks like you haven’t added anything to your cart yet.</span>
              <button className="trans" onClick={onClose}>Continue Shopping</button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="CatDisplayBtn">
            <button className="trans" onClick={onClose}>Continue Shopping</button>
            <button disabled={cartItems.length === 0 && !user} onClick={() => handleCheckOutPage(cartItems)} >Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatDisplay;
