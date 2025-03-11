import React from 'react';
import "./AdminSideNavigation.css";
import { BiGridAlt, BiCart, BiUser, BiPackage, BiTag, BiTransfer, BiCog, BiLogOut, BiHelpCircle } from "react-icons/bi";

const navigationItems = [
    { id: 1, name: "Dashboard", icon: <BiGridAlt /> },
    { id: 2, name: "Orders", icon: <BiCart /> },
    { id: 3, name: "Customers", icon: <BiUser /> },
    { id: 4, name: "Products", icon: <BiPackage /> },
    { id: 5, name: "Brands", icon: <BiTag /> },
    { id: 6, name: "Transactions", icon: <BiTransfer /> },
    { id: 7, name: "Settings", icon: <BiCog /> },
    { id: 8, name: "Logout", icon: <BiLogOut color='red' /> },
    { id: 9, name: "Help", icon: <BiHelpCircle /> },
];

const AdminSideNavigation = ({ activeComponent, setActiveComponent  }) => {
    return (
        <nav className="admin-side-navigation">
            <ul>
                {navigationItems.map(item => (
                    <li 
                      key={item.id} 
                      className={`nav-item ${activeComponent === item.name ? "active" : ""}`}  
                      onClick={() => setActiveComponent(item.name)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminSideNavigation;
