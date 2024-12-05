import React from 'react'
import './homepage.css'
import {Link} from 'react-router-dom'

const Homeie = () => {
  return (
    <div className='homie'>
      <div className="homi">
        <div className="homi1">
          <h2><i>Tasty restaurant</i></h2>
        </div>
        <div className="homi2">
          <h1><i>Home of delicacies</i></h1>
          <h4>The legacy lives on.</h4>
        </div>
        <div className="butt">
          <Link to='/menu'><button>order now</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Homeie