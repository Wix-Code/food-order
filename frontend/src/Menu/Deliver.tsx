import React from 'react'
import './menu.css'
import { Link } from 'react-router-dom'

const Deliver = () => {
  return (
    <div className='cancan'>
      <div className="cancan1">
        <h1>Delivery Menu</h1>
        <div className="cancan2">
          <Link to="/"><h2>Home</h2></Link>
          <span>/</span>
          <h2>Menu</h2>
        </div>
      </div>
    </div>
  )
}

export default Deliver