import React, { useContext, useState } from 'react';
import './Auth.css';
import { AuthContext } from '../context/AuthContext';
import LoadingDots from '../Loading/LoadingDots ';

const Auth = ({ onClose }) => {
    const [isActive, setIsActive] = useState("Login");
    const [saveInfo, setSaveInfo] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { login, register, loading, setLoading } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        country: "",
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToggleSave = () => setSaveInfo(!saveInfo);
    const handleToggleTerms = () => setAcceptTerms(!acceptTerms);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        let success = false;
    
        if (isActive === "Login") {
            const response = await login({ email: formData.email, password: formData.password });
            success = response?.success !== false;  // Check if login was successful
        } else {
            const response = await register(formData.fullName, formData.email, formData.country, formData.password);
            success = response?.success !== false;  // Check if registration was successful
        }
    
        setLoading(false);
    
        if (success) {
            onClose(); // Close the modal
        }
    };
    

    if (loading){
        return <LoadingDots /> 
    }

    return (
        <div className='AuthWrapper' onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className='BoxDisplay'>
                <div className='SelectionForm'>
                    <p 
                        className={isActive === "Login" ? "active" : ""} 
                        onClick={() => setIsActive("Login")}
                    >
                        Login
                    </p>
                    <p 
                        className={isActive === "Signup" ? "active" : ""} 
                        onClick={() => setIsActive("Signup")}
                    >
                        Sign Up
                    </p>
                </div>

                <form className='AuthForm' onSubmit={handleSubmit}>
                    {isActive === "Signup" && (
                        <input 
                            type="text" 
                            name="fullName" 
                            placeholder="Full Name" 
                            required 
                            value={formData.fullName} 
                            onChange={handleChange} 
                        />
                    )}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        required 
                        value={formData.password} 
                        onChange={handleChange} 
                    />

                    {isActive === "Signup" && (
                        <select name="country" required value={formData.country} onChange={handleChange}>
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="NG">Nigeria</option>
                            <option value="IN">India</option>
                            <option value="CA">Canada</option>
                        </select>
                    )}

                    <div className="Options">
                        {isActive === "Login" && (
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={saveInfo} 
                                    onChange={handleToggleSave} 
                                />
                                Remember me 
                            </label>
                        )}
                        {isActive === "Signup" && (
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={acceptTerms} 
                                    onChange={handleToggleTerms} 
                                />
                                Accept Terms & Conditions
                            </label>
                        )}
                    </div>

                    <button type="submit" disabled={loading || (isActive === "Signup" && !acceptTerms)}>
                        {isActive === "Login" ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
