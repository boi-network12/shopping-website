import React from 'react'
import "./TextAnalysis.css"
import { BiBox, BiDollar, BiLogInCircle, BiUserCheck } from "react-icons/bi"



const TextAnalysis = ({user}) => {

    const AnalysisMaker = [
        {
            id: 1,
            number: user && user.role === "admin" && user.dailyVisitors,
            title: ' Daily Visitors',
            icon: <BiUserCheck color='#739cb8' size={50} />
        },
        {
            id: 2,
            number: user && user.role === "admin" && user.dailySignup,
            title: ' Daily signup',
            icon: <BiLogInCircle color='#739cb8' size={50} />
        },
        {
            id: 3,
            number: user && user.role === "admin" && user.dailyOrders,
            title: ' Daily orders',
            icon: <BiBox color='#739cb8' size={50} />
        },
        {
            id: 4,
            number: user && user.role === "admin" && user.dailyRevenue,
            title: ' Daily Revenue',
            icon: <BiDollar color='#739cb8' size={50} />
        },
    ]


  return (
    <>
       {AnalysisMaker.map((item) => (
        <div key={item.id} className='TextAnalysisBox'>
            <div className='ps'>
                <p>{item.number}</p>
                <span>{item.title}</span>
            </div>
            {item.icon}
        </div>
    ))}
    </>
  )
}

export default TextAnalysis