import React from 'react'
import './homepage.css'

const Order = () => {
  const Orders = [
    {
      id: 1,
      pics:'div/order3.jpg',
      des: 'Free delivery',
      quo: 'Get a delivery quote',
    },
    {
      id: 2,
      pics:'div/order1.jpg',
      des: 'Order online',
      quo: 'Delivery available across all nation',
    },
    {
      id: 3,
      pics:'div/order2.jpg',
      des: 'get in touch',
      quo: 'Get a delivery quote',
    },
  ]
  return (
    <div className='order'>
      <div className="orders">
        {
          Orders.map((order) => {
            return (
              <div className="ord" key={order.id}>
                <img src={order.pics} alt="" />
                <div className="or">
                  <h2>{order.des}</h2>
                  <h4>{order.quo}</h4>
                </div>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default Order