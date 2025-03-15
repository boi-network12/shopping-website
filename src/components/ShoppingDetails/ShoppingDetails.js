import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the default styling
import "./ShoppingDetails.css";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ShoppingDetails = ({ cartItems, user, createOrder }) => {
  const [shippingMethod, setShippingMethod] = useState("flatRate");
  const [shippingCost, setShippingCost] = useState(1000);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState(""); // State is now a string
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState(""); // Add address state
  const [notes, setNotes] = useState("");
  const [paymentMethod] = useState("payOnline");

  const publicKey = "pk_test_630476f0340879e41f3b9f62b13a432631b224fa";
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    setShippingCost(shippingMethod === "flatRate" ? 1000 : 0);
  }, [shippingMethod]);

  useEffect(() => {
    // Fetch country list
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2.toLowerCase(),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + shippingCost;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default form submission if called from a form

    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }

    console.log("Cart Items:", cartItems);

    const orderData = {
      user: user._id,
      cartItems: cartItems.map((item) => ({
        productId: item.uniqueId,
        productName: item.productName,
        image: item.image,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      shippingDetails: {
        firstName,
        lastName,
        phone,
        altPhone,
        email,
        country: selectedCountry,
        state: states, // Use manually entered state
        city,
        zipCode,
        address, // Include address in the order data
      },
      shippingMethod,
      shippingCost,
      totalAmount: total,
      paymentMethod,
      notes,
    };

    try {
      await createOrder(orderData);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handlePaystackSuccess = (response) => {
    console.log("Payment successful:", response);
    toast.success("Payment successful! Placing your order...");

    // Clear the local storage
    localStorage.removeItem("cart");

    // Navigate to the home route ("/")
    navigate("/");

    // Submit the order
    handleSubmit();
  };

  const handlePaystackClose = () => {
    toast.warn("Payment cancelled");
  };

  const componentProps = {
    email,
    amount: total * 100, // Paystack uses kobo (multiply by 100)
    publicKey,
    text: "Pay with Paystack",
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
  };

  return (
    <div className="ShoppingDetailsWrapper">
      <form>
        <h3>Shopping details</h3>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name*"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="inputDiv">
          {/* Phone number input with country code support */}
          <PhoneInput
            country={selectedCountry ? selectedCountry.toLowerCase() : "us"}
            value={phone}
            onChange={setPhone}
            placeholder="Phone*"
            required
          />
          <PhoneInput
            country={selectedCountry ? selectedCountry.toLowerCase() : "us"}
            value={altPhone}
            onChange={setAltPhone}
            placeholder="Alternative phone"
          />
        </div>
        <div className="inputDiv">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Address*"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="inputDiv">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="State/Region*"
            value={states}
            onChange={(e) => setStates(e.target.value)}
            required
          />
        </div>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="City*"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <p>
          <input type="checkbox" /> Save the above shipping address
        </p>
        <div className="inputDiv">
          <textarea
            cols="30"
            rows="10"
            placeholder="Note (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="inputDiv lastDiv">
          <h3>
            Shipping Method <p>change</p>
          </h3>
          <select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="flatRate">Flat Rate</option>
            <option value="customerPickUp">Custom Pick-up</option>
          </select>
        </div>
      </form>
      <div className="OrderDisplayForm">
        <h3>Your Order</h3>
        <div className="content">
          <h2>
            <p>Product</p> <p>Subtotal</p>
          </h2>
          {cartItems.map((item, index) => (
            <div key={index} className="itemView">
              <div className="item-container">
                <img src={item.image} alt="" />
                <div className="itemInfo">
                  <h5>{item.productName}</h5>
                  <span>
                    Size: {item.selectedSize}, Color: {item.selectedColor}
                  </span>
                </div>
              </div>
              <p>₦ {new Intl.NumberFormat().format(item.price)}</p>
            </div>
          ))}
          <h2 className="secondH2">
            <p>Subtotal</p> <p>₦{new Intl.NumberFormat().format(subtotal)}</p>
          </h2>
          <h2 className="secondH2">
            <p>Shipping</p> <p>₦{new Intl.NumberFormat().format(shippingCost)}</p>
          </h2>
          <h2 className="secondH2">
            <p>Total</p> <p>₦{new Intl.NumberFormat().format(total)}</p>
          </h2>
        </div>
        <div className="PaymentMethod">
          <h3>Choose Payment Method</h3>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingDetails;