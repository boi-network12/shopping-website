import React from 'react'
import "./TextAnalysis.css"
import { BiBox, BiDollar, BiLogInCircle, BiUserCheck } from "react-icons/bi"

const AnalysisMaker = [
    {
        id: 1,
        number: 12,
        title: ' Daily Visitors',
        icon: <BiUserCheck color='#739cb8' size={50} />
    },
    {
        id: 2,
        number: 1,
        title: ' Daily signup',
        icon: <BiLogInCircle color='#739cb8' size={50} />
    },
    {
        id: 3,
        number: 100,
        title: ' Daily orders',
        icon: <BiBox color='#739cb8' size={50} />
    },
    {
        id: 4,
        number: 40000,
        title: ' Daily Revenue',
        icon: <BiDollar color='#739cb8' size={50} />
    },
]

const TextAnalysis = () => {
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