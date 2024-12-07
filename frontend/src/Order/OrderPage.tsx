import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import './order.css'

import axios from "axios"
import Loader from '../Loader/Loader'

const OrderPage = () => {

  //const {cart} = useContext(StoreContext)
  const userData = localStorage.getItem('user');
  const navigate = useNavigate()
  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id

  const [order, setOrder] = useState([])

  const {cart} = useContext(StoreContext)

  const [loader, setLoader] = useState(true)

 

  useEffect(()=>{
    if(!id){
      navigate("/login")
    }
    track()
  }, [id, navigate])

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
  }, [])

  

  const track = async () => {
    const res = await axios.post("https://food-order-1-p0hh.onrender.com/api/order/user", {userId: id}, {
      withCredentials: true
    })
    console.log(res)
    if(res.data.data){
      setOrder(res.data.data)
    }
    console.log(order)
  }

  if (loader) {
    return <Loader />
  }


  return (
    <div className='orders_page'>
      <h1>My Orders</h1>
      <div className="orderpage">
        {
        order.map((item : any) => {
          return(
            <div className="order_pg">
              {
                item.items.map((order : any) => {
                  return (
                    <div className='order_qty'>
                      <p>{order.name}</p>
                      <p>x{order.quantity}</p>
                    </div>
                  )
                })
              }
              <p>Items: {item.items.length}</p>
              <h3>&#8358;{item.amount}</h3>
              <h2>{item.status}</h2>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default OrderPage