import React, { useContext } from 'react'
import "./Dashboard.css"
import TextAnalysis from '../../components/TextAnalysis/TextAnalysis'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  
  
  return (
    <div className='DashboardDisplayOrderWrapper'>
        <div className='TAWrapper'>
           <TextAnalysis user={user}/>
        </div>
        <div className='SalesChart'>
            {/*  */}
        </div>
    </div>
  )
}

export default Dashboard