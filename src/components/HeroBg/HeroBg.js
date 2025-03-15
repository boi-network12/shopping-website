import React from 'react';
import { useLocation } from 'react-router-dom';
import "./HeroBg.css";

const HeroBg = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className={`HeroBgWrapper ${isCheckoutPage ? "checkoutBg" : ""}`}>
      <h1>{isCheckoutPage ? "Checkout" : "Welcome to"}</h1>
      {!isCheckoutPage && <p>Store</p>}
    </div>
  );
};

export default HeroBg;
