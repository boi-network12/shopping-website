import React, { useContext, useState } from 'react'
import "./Dashboard.css"
import TextAnalysis from '../../components/TextAnalysis/TextAnalysis'
import { AuthContext } from '../../context/AuthContext'
import ChartDisplay from '../../components/ChartDisplay/ChartDisplay'

const Dashboard = ({ setActiveComponent }) => {
  const { user } = useContext(AuthContext);
  const [activeComponent] = useState("");

  
  
  return (
    <div className='DashboardDisplayOrderWrapper'>
        <div className='TAWrapper'>
           <TextAnalysis user={user}/>
        </div>
        
        <div className='SalesChart'>
           <ChartDisplay activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </div>
    </div>
  )
}

export default Dashboard