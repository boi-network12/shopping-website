import React, { useState } from 'react'
import "./AdminDisplay.css"
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSideNavigation from '../../components/AdminSideNavigation/AdminSideNavigation'
import Dashboard from '../../AdminComponets/Dashboard/Dashboard'
import Customer from '../../AdminComponets/Customer/Customer'
import Orders from '../../AdminComponets/Order/Orders'
import Products from '../../AdminComponets/Products/Products'
import Brands from '../../AdminComponets/Brands/Brands'
import Transactions from '../../AdminComponets/transactions/Transactions'
import Settings from '../../AdminComponets/Settings/Settings'
import Help from '../../AdminComponets/Help/Help'

const componentMap = {
    "Dashboard": <Dashboard />,
    "Customers": <Customer/>,
    "Orders": <Orders/>,
    "Products": <Products/>,
    "Brands": <Brands/>,
    "Transactions": <Transactions/>,
    "Settings": <Settings/>,
    "Help": <Help/>
  };

const AdminDisplay = () => {
    const [activeComponent, setActiveComponent] = useState("Dashboard");


  return (
    <div className='AdminDisplayContainer'>
        <AdminHeader/>
        <div className='BgDisplay'>
            <aside>
                <AdminSideNavigation 
                     activeComponent={activeComponent}
                     setActiveComponent={setActiveComponent}
                />
            </aside>
            <main>
                {componentMap[activeComponent]}
            </main>
        </div>
    </div>
  )
}

export default AdminDisplay