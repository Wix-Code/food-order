import React, { useContext } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Context/Context'

const Cart = () => {

  //const { addtocart } = useContext(StoreContext) 
  const { inc, dec, clear, addtocart, data, cart, total } = useContext(StoreContext);

  console.log( "cart is here",cart)
  
  return (
    <div className='cartt'>
      <div className="carrt">
        {
          cart && cart.length === 0 ?
          <>
          <div className="ca">
            <h1>Your Cart is Empty</h1>
            <Link to="/menu"><button>Order Now</button></Link>
          </div>
          </>
        :
        <div className="cart2">
        {
          cart.map((dat : any)=>{
            return (
                <div className="cart3" key={dat._id}>
                  <div className="ima">
                    <div className='image'>
                      <img src={dat.image} alt="" />
                    </div>
                    <div className="des">
                      <h2>{dat.name}</h2>
                      <h3>{dat.desc}</h3>
                    </div>
                    <div className="but">
                      <button onClick={()=>clear(dat)}>X</button>
                    </div>
                  </div>
                  <div className="cart5">
                    <h3>{dat.desc}</h3>
                  </div>
                  <div className="car1">
                      <div className="inp">
                        <button disabled={dat.quantity <= 1} onClick={()=> dec(dat)}>-</button>
                        <p>{dat.quantity}</p>
                        <button onClick={()=>inc(dat)}>+</button>
                      </div>
                      <p>&#8358;{dat.price * dat.quantity}</p>
                  </div>
                </div>
            )
          })
        }
        { cart.length > 0 &&
         (
          <div className='total'>
            <p>Total : &#8358;{total}</p>
          <Link to='/check'>
            <button className='button'>CHECK OUT</button>
          </Link>
        </div>
        ) 
        }
       </div>
}
       </div>
    </div>
  )
}

export default Cart