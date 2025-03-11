import React from 'react'
import "./AdminHeader.css"
import { BiBell, BiEnvelope, BiSearch } from "react-icons/bi"

const AdminHeader = () => {
  return (
    <div className='AdminHeaderWrapper'>
        <img className='logo' src={require("../../assets/image/logo.jpeg")} alt="" />
        <div className='inputContainer'>
            <BiSearch size={22} color='#333' />
            <input type="text" placeholder='search' />
        </div>
        <div className='textIconModel'>
            <p className='ModelClick'>
                <span>notifications</span>
                <BiBell size={20} color='#333' />
            </p>
            <p className='ModelClick'>
                <span>Messages</span>
                <BiEnvelope size={20} color='#333' />
            </p>
        </div>
        <div className='UserData'>
            <img src={require("../../assets/image/avatar.png")}  alt="" />
            <div className='UserNameDictate'>
                <p>Adam lisa</p>
                <span>admin</span>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader