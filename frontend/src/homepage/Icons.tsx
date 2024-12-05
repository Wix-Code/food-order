import React from 'react'
import './homepage.css'
import {FaMotorcycle, FaMortarPestle,FaPepperHot} from 'react-icons/fa6'
const Icons = () => {
  return (
    <div className='icons'>
      <div className="icon">
        <div className="icon1">
          <span><FaMotorcycle /></span>
          <h3>Delivery on demand</h3>
          <h4>Enjoy doorstep delivery across nation, with real-time tracking from kitchen to your door.</h4>
        </div>
        <div className="icon2">
          <span><FaMortarPestle /></span>
          <h3>A VARIETY OF DISHES</h3>
          <h4>Explore a diverse menu filled with tantalizing dishes, decadent desserts, and refreshing drinks.
          </h4>
        </div>
        <div className="icon3">
          <span><FaMotorcycle /></span>
          <h3>EXPERIENCED CHEFS</h3>
          <h4>Our chefs, steeped in years of culinary expertise, prepare Aya Mase like no one else.
          </h4>
        </div>
        <div className="icon4">
          <span><FaPepperHot /></span>
          <h3>FRESH FOOD</h3>
          <h4>We commit to quality by using only the finest ingredients, sourced locally whenever possible.
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Icons