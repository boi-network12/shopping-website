import React from 'react'
import "./Footer.css"
import { BiMapPin, BiPhone } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='FooterWrapper'>
        <div className='ContactDisplay'>
            <form className='subDisplay'>
                <h5>sign up for discount & updates</h5>
                <input 
                    type="text"
                    placeholder='Enter your email address'
                />
                <button>subscribe</button>
            </form>
            <div className='LocDisplay'>
                <details>
                </details>
                <h4>contact us</h4>
                <p><BiPhone/> +234 00 0000 000 </p>
                <p><BiMapPin/> Lekki, Ajah, Lagos State, Ajah. Lagos Nigeria. 100001 </p>
               <img src={require("../../assets/image/cardName.png")} alt="" />
            </div>
        </div>
        <div className='binnetFooter'>
            <Link to="https://kamdi-devs.vercel.app" target='_blank'>
               made by kamdi dev
            </Link>
        </div>
    </div>
  )
}

export default Footer