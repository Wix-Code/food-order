import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../Context/Context'
import './order.css'

import axios from "axios"

const OrderPage = () => {

  //const {cart} = useContext(StoreContext)
  const userData = localStorage.getItem('user');
  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id

  const [order, setOrder] = useState([])

  const {cart} = useContext(StoreContext)

  useEffect(()=>{
    

    track()
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