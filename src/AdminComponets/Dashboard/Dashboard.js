import React from 'react'
import "./Dashboard.css"
import TextAnalysis from '../../components/TextAnalysis/TextAnalysis'

const Dashboard = () => {
  return (
    <div className='DashboardDisplayOrderWrapper'>
        <div className='TAWrapper'>
           <TextAnalysis/>
        </div>
        <div className='SalesChart'>
            {/*  */}
        </div>
    </div>
  )
}

export default Dashboard