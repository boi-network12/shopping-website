import React from 'react'
import "./CatDisplay.css"
import { BiTrash, BiX } from "react-icons/bi"

const CatDisplay = ({onClose}) => {
  return (
    <div className='CatDisplayWrapper' onClick={onClose}>
        <div className='CatDisplayContainer' onClick={(e) => e.stopPropagation()} >
         <div className='BtnCancel'>
             <p><BiTrash size={22} color='#333' /> clear cart </p> 
             <BiX size={22} onClick={onClose}/>
        </div>
        <div>
            {/*  */}
        </div>
        <div className='CatDisplayBtn'>
            <button className='trans'>continue shopping</button>
            <button>proceed to checkout</button>
        </div>
        </div>
        
    </div>
  )
}

export default CatDisplay