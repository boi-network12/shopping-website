import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onClose }) => {
    const [isActive, setIsActive] = useState("Login");
    const [saveInfo, setSaveInfo] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleToggleSave = () => setSaveInfo(!saveInfo);
    const handleToggleTerms = () => setAcceptTerms(!acceptTerms);

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

                {isActive === "Login" ? (
                    <form className='AuthForm'>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <div className="Options">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={saveInfo} 
                                    onChange={handleToggleSave} 
                                />
                                Remember me 
                            </label>
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form className='AuthForm'>
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <select required>
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="NG">Nigeria</option>
                            <option value="IN">India</option>
                            <option value="CA">Canada</option>
                        </select>
                        <div className="Options">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={acceptTerms} 
                                    onChange={handleToggleTerms} 
                                />
                                Accept Terms & Conditions
                            </label>
                        </div>
                        <button type="submit" disabled={!acceptTerms}>Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Auth;
