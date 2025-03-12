import React, { useContext, useEffect, useState } from 'react'
import "./AccountDetails.css"
import { BiSave, BiTrash, BiUserCircle } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom"

const AccountDetails = () => {
    const { updateUserInfo, user, deleteAccount } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate()


    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);


    // Initialize form with user data
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        country: "Nigeria",
        state: "",
        city: "",
        address: "",
        phone: "",
    });

    // Load user details into the form when user changes
    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || "",
                email: user.email || "",
                country: user.country || "Nigeria",
                state: user.state || "",
                city: user.city || "",
                address: user.address || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    // Fetch countries
    useEffect(() => {
        const fetchCountries = async () => {
        try {
            const response = await fetch("https://countriesnow.space/api/v0.1/countries");
            const data = await response.json();
            if (data.error === false) {
            setCountries(data.data.map((country) => country.country));
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
        };

        fetchCountries();
    }, []);

    // Fetch states when a country is selected
    const fetchStates = async (countryName) => {
        try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: countryName }),
        });

        const data = await response.json();
        if (data.error === false) {
            setStates(data.data.states.map((state) => state.name));
        }
        } catch (error) {
        console.error("Error fetching states:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        if (name === "country" ) {
            setStates([])
          fetchStates(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await updateUserInfo(userData);
        if (result.success) {
            console.log("User updated successfully");
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        setDeleting(true);
        await deleteAccount();
        navigate("/")
        setDeleting(false);
    };

  return (
    <div className="AccountDetailsWrapper">
            <div className="ShowCase">
                <BiUserCircle size={50} color="#148114" />
                <div>
                    <h2>Account Details</h2>
                    <p>Edit your account details to make sure it’s up to date.</p>
                </div>
            </div>
            <form className="details-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="name"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <select name="country" value={userData.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                        {country}
                        </option>
                    ))}
                </select>
                <select name="state" value={userData.state} onChange={handleChange} >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>
                        {state}
                        </option>
                    ))}
                </select>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                    />
                </div>
                <div className="phone-input">
                    <span className="flag">🇳🇬</span>
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                    />
                </div>
                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px"
                }}>
                    <button type="submit" className="save-btn" disabled={loading || deleting}>
                        {loading ? "Saving..." : <><BiSave size={20} /> Save Changes</>}
                    </button>
                    <button
                        type="button"
                        className="save-btn"
                        disabled={loading || deleting}
                        style={{ background: "red" }}
                        onClick={handleDelete}
                    >
                        {deleting ? "Deleting..." : <><BiTrash size={20} /> Delete Account</>}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default AccountDetails