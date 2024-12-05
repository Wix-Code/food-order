import React from 'react'
import './menu.css'
import { Link } from 'react-router-dom'

const Menu = () => {
  const menuu = [
    {
      id: 1,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 2,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 3,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 4,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 5,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 6,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 7,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 8,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
    {
      id: 9,
      food: 'Rice',
      pic: './div/food1.jpg'
    },
  ]
  return (
    <div className='menuu'>
      <div className="menu1">
        <Link to="/menu/rice">
              <div className="men1">
                <div className="imm">
                  <img src="../div/rice1.png" alt="" />
                </div>
                <div className="food">
                  <h3>Rice</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/beans">
              <div className="men1">
                <div className="imm">
                  <img src="../div/beans.png" alt="" />
                </div>
                <div className="food">
                  <h3>Beans</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/egusi">
              <div className="men1">
                <div className="imm">
                  <img src="../div/egusi.png" alt="" />
                </div>
                <div className="food">
                  <h3>Egusi</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/ogbono">
              <div className="men1">
                <div className="imm">
                  <img src="../div/ogbono.png" alt="" />
                </div>
                <div className="food">
                  <h3>Ogbono</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/shawama">
              <div className="men1">
                <div className="imm">
                  <img src="../div/shawa.png" alt="" />
                </div>
                <div className="food">
                  <h3>Shawarma</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/snacks">
              <div className="men1">
                <div className="imm">
                  <img src="../div/snack1.png" alt="" />
                </div>
                <div className="food">
                  <h3>Snacks</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/drinks">
              <div className="men1">
                <div className="imm">
                  <img src="../div/wine.png" alt="" />
                </div>
                <div className="food">
                  <h3>Drinks</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/cakes">
              <div className="men1">
                <div className="imm">
                  <img src="../div/cake1.png" alt="" />
                </div>
                <div className="food">
                  <h3>Cakes</h3>
                </div>
              </div>
        </Link>
        <Link to="/menu/pizza">
              <div className="men1">
                <div className="imm">
                  <img src="../div/pizza1.png" alt="" />
                </div>
                <div className="food">
                  <h3>Pizza</h3>
                </div>
              </div>
        </Link>
      </div>
    </div>
  )
}

export default Menu