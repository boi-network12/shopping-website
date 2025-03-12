import React, { useContext, useState } from 'react'
import "./Header.css"
import { BiCart, BiSearch, BiUser } from "react-icons/bi"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom"

const Header = ({setIsAuthModalOpen, setIsCatModalOpen}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleUserNavigation = () => {
        if (user?.role === "admin") {
            navigate("/admin-dashboard");
        } else {
            navigate("/profile");
        }
    };

  return (
    <div className={`HeaderWrapper ${isSearchActive ? "hideElements" : ""}`} >
        <img src={require("../../assets/image/logo.jpeg")} alt="logo" />

        <div className={`SearchAuthContainer ${isSearchActive ? "active" : ""}`} >
            <div 
                 className={`inputContainer ${isSearchActive ? "active" : ""}`} 
                 onClick={() => setIsSearchActive(true)}
            >
                <input 
                    type="text" 
                    placeholder='search'
                    autoFocus
                    onBlur={() => setIsSearchActive(false)}
                />
                <BiSearch size={22}/>
            </div>
            {!user ? (
                <p onClick={() => setIsAuthModalOpen(true)} style={{ cursor: "pointer" }} className='a' >
                Login
             </p>
            ) : (
                <BiUser size={22} 
                color='#333' 
                onClick={handleUserNavigation} 
                style={{ cursor: "pointer" }} 
                />
            )}
            <p onClick={() => setIsCatModalOpen(true)} className='CartContainer'>
                <BiCart size={25} color='#333' />
                <span>cart</span>
            </p>
        </div>
        
    </div>
  )
}

export default Header