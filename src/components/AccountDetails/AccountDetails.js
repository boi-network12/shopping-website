import React, { useState } from 'react'
import "./AccountDetails.css"
import { BiSave, BiUserCircle } from 'react-icons/bi';

const AccountDetails = () => {
    const [userData, setUserData] = useState({
        firstName: 'Kamdilichukwu',
        lastName: 'Okolo',
        country: 'Nigeria',
        state: 'Anambra',
        city: 'Nkpor',
        address: '29 Mbukwu St',
        phone: '+234 907 513 4655'
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };


  return (
    <div className='AccountDetailsWrapper'>
            <div className='ShowCase'>
                <BiUserCircle size={50} color='#148114' />
                <div>
                    <h2>Account Details</h2>
                    <p>Edit your account details to make sure it’s up to date.</p>
                </div>
            </div>
            <div className="details-form">
                <div  style={{ 
                               width: "100%",
                               display: "flex",
                               justifyContent: "space-between",
                               gap: "10px"
                            }}>
                    <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" />
                    <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
                </div>
                <select name="country" value={userData.country} onChange={handleChange}>
                    <option>Nigeria</option>
                </select>
                <select name="state" value={userData.state} onChange={handleChange}>
                    <option>Anambra</option>
                </select>
                <div style={{ 
                               width: "100%",
                               display: "flex",
                               justifyContent: "space-between",
                               gap: "10px"
                            }}>
                    <input type="text" name="city" value={userData.city} onChange={handleChange} placeholder="City" />
                    <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" />
                </div>
                <div className="phone-input">
                    <span className="flag">🇳🇬</span>
                    <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                </div>
                <button className="save-btn"><BiSave size={20} /> Save Changes</button>
            </div>
    </div>
  )
}

export default AccountDetails