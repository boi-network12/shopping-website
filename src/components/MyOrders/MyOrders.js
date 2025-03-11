import React from 'react'
import { BiCartAlt } from 'react-icons/bi'

const MyOrders = () => {
  return (
    <div className='AccountDetailsWrapper'>
                <div className='ShowCase'>
                    <BiCartAlt size={50} color='#148114' />
                    <div>
                        <h2>My order</h2>
                        <p>Take a look at your recent orders and details</p>
                    </div>
                </div>
                <div></div>
        </div>
  )
}

export default MyOrders