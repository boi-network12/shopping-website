import React, { useContext } from 'react'
import "./AdminHeader.css"
import { BiBell, BiEnvelope, BiSearch } from "react-icons/bi"
import { AuthContext } from '../../context/AuthContext'

const AdminHeader = ({ setNotificationActive  }) => {
    const { user } = useContext(AuthContext);

  return (
    <div className='AdminHeaderWrapper'>
        <img className='logo' src={require("../../assets/image/logo.jpeg")} alt="" />
        <div className='inputContainer'>
            <BiSearch size={22} color='#333' />
            <input type="text" placeholder='search' />
        </div>
        <div className='textIconModel'>
            <p className='ModelClick' onClick={() => setNotificationActive(prev => !prev)}>
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
                <p>{user && user.role === "admin" && user.name}</p>
                <span>{user && user.role === "admin" && user.role}</span>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader