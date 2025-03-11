import React from 'react'
import { BiStar } from 'react-icons/bi'

const PendingReviews = () => {
  return (
    <div className='AccountDetailsWrapper'>
                <div className='ShowCase'>
                    <BiStar size={50} color='#148114' />
                    <div>
                        <h2>PENDING REVIEWS</h2>
                        <p>Rate and review products you purchased</p>
                    </div>
                </div>
                <div></div>
        </div>
  )
}

export default PendingReviews