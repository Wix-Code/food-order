import React from 'react'
import './footer.css'
import { GiChefToque } from 'react-icons/gi'
import {FaFacebookSquare,FaTwitterSquare,FaInstagramSquare} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="foot">
        <div className="foot1">
            <Link to="/"><h1>Tasty <span><GiChefToque /></span></h1></Link>
            <p>Plot 12, Dutse Alhaji</p>
            <p>Abuja, F.C.T, Nigeria</p>
            <p>08126829146</p>
        </div>
        <div className="foot2">
          <h1>Our menu</h1>
          <div className="foot21">
            <Link to="/menu/rice"><p>rice</p></Link>
            <Link to="/menu/beans"><p>beans</p></Link>
            <Link to="/menu/egusi"><p>egusi</p></Link>          
            </div>
          <div className="foot21">
          <Link to="/menu/shawama"><p>shawarma</p></Link>
          <Link to="/menu/ogbono"><p>ogbono</p></Link>             
          <Link to="/menu/cakes"><p>cakes</p></Link>
          </div>
          <div className="foot21">
          <Link to="/menu/snacks"><p>snacks</p></Link>            
          <Link to="/menu/drinks"><p>drinks</p></Link>
          <Link to="/menu/pizza"><p>pizza</p></Link>          </div>
        </div>
        <div className="foot3">
          <h1>Get social</h1>
          <div className="foot33">
            <span><FaFacebookSquare /></span>
            <span><FaTwitterSquare /></span>
            <span><FaInstagramSquare /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer