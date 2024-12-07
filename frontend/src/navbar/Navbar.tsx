import React, { useContext, useState } from 'react'
import './navbar.css'
import {GiChefToque } from 'react-icons/gi'
import {ImSpoonKnife } from 'react-icons/im'
import {FaMessage,FaUser,FaCartShopping,FaBars} from 'react-icons/fa6'
import{FaTimes} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/Context'
import axios from 'axios'

const Navbar = () => {
  const[click,setClick] = useState(false)
  const { cart } = useContext(StoreContext)
  const navigate = useNavigate()

  const userData = localStorage.getItem('user');
  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id

  const signOut = async () => {
    try {
      await axios.post('https://food-order-1-p0hh.onrender.com/api/auth/logout',{
        withCredentials: true,
      })
      localStorage.removeItem('user')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='navbar'>
      <div className="nav">
        <Link to="/">
          <div className="navbar1">
            <h1 onClick={() =>setClick(false)}>TASTY</h1>
            <span><GiChefToque /></span>
          </div>
        </Link>
        <div className={click ? "navres" : "navbar2"}>
          <Link to="/menu">
            <div className="menu" onClick={()=>setClick(false)}>
              <span><ImSpoonKnife /></span>
              <h4>menu</h4>
            </div>
          </Link>
          <Link to="/login">
            <div className="log" onClick={()=>setClick(false)}>
              <span><FaUser /></span>
              <h4>login/register</h4>
            </div>
          </Link>
          <div className="cont" onClick={()=>setClick(false)}>
            <span><FaMessage /></span>
            <h4>contact</h4>
          </div>
          <div className="signout">
            {
              id && <h4 onClick={signOut}>Sign Out</h4>
            }
          </div>
        </div>
        <div className="navbar3">
          <div className="signout">
            {
              id && <h4 onClick={signOut}>Sign Out</h4>
            }
          </div>
          <Link to='/cart'>
            <div className="cart">
            <span><FaCartShopping /></span>
            <h4>{cart?.length}</h4>
            </div>
          </Link>
        </div>
        <div className="cut">
          <Link to='/cart'>
            <div className="cart" onClick={()=>setClick(false)}>
              <span><FaCartShopping /></span>
              <h4>{cart?.length}</h4>
            </div>
          </Link>
          <div className="bar">
            <button onClick={()=>setClick(!click)}>{click ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar