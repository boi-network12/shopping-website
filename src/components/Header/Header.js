import React, { useState } from 'react'
import "./Header.css"
import { BiCart, BiSearch } from "react-icons/bi"

const Header = ({setIsAuthModalOpen, setIsCatModalOpen}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);

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
            <p onClick={() => setIsAuthModalOpen(true)} style={{ cursor: "pointer" }} className='a' >
               <p>Login</p>
            </p>
            <p onClick={() => setIsCatModalOpen(true)} className='CartContainer'>
                <BiCart size={25} color='#333' />
                <span>cart</span>
            </p>
        </div>
        
    </div>
  )
}

export default Header