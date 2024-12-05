import React, { useContext, useState } from 'react'
import './checkout.css'
import { StoreContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Chectout = () => {

  const {cart, total, setCart } = useContext(StoreContext)
  const navigate = useNavigate()
  const userData = localStorage.getItem('user');

  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id


  interface SetBooking {
    firstname: string;
    lastname: string;
    state: string;
    lga: string;
    email: string;
    phoneNo: string;
    street: string;
    town: string;
  }

  const [booking, setBooking] = useState<SetBooking>({
    firstname: "",
    lastname: "",
    state: "",
    lga: "",
    email: "",
    phoneNo: "",
    street: "",
    town: "",
  })

  const submitBooking = (e : any) => {
    e.preventDefault()
    setBooking({...booking, [e.target.name]: e.target.value})
  }

  const makePayment = async (e : any) => {
    e.preventDefault();
    console.log(booking)

    const cartData = {
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image
      })),
      amount: total,
      firstname: booking.firstname,
      lastname: booking.lastname,
      email: booking.email,
      street: booking.street,
      town: booking.town,
      lga: booking.lga,
      state: booking.state,
      phoneNo: booking.phoneNo,
      userId: id
    }

    console.log(cartData, "cartDAta")

    const response = await axios.post("http://localhost:5000/api/order",cartData,{
      withCredentials: true,
    })
    if(response.data.session.status === true){
      //const {authorization_url
      //} = response.data.session;
      console.log(response.data.session.data.authorization_url)
      window.location.replace(response.data.session.data.authorization_url);
      //window.location.replace(authorization_url);
    }
    else{
      alert('Error')
    }

    console.log(response)
    
  }

  if(!id){
     navigate("/login")
  }

  console.log(cart)

  return (
    <div className='checkout'>
      <div className="check_out">
      <div className="checkout1">
        <h1>Booking Details</h1>
        <form action="">
          <div className="checkout_input">
            <div className="input_check">
              <label htmlFor="">Firstname</label>
              <input type="text" name="firstname" placeholder='Firstname' onChange={submitBooking} />
            </div>
            <div className="input_check">
              <label htmlFor="">Lastname</label>
              <input type="text" name="lastname" placeholder='Lastname' onChange={submitBooking} />
            </div>
          </div>
          <div className="checkout_input">
            <div className="input_check">
              <label htmlFor="">State</label>
              <input type="text" name="state" placeholder='State' onChange={submitBooking} />
            </div>
            <div className="input_check">
              <label htmlFor="">LGA</label>
              <input type="text" name="lga" placeholder='L.G.A' onChange={submitBooking}/>
            </div>
          </div>
          <div className="checkout_input">
            <div className="input_check">
              <label htmlFor="">Town</label>
              <input type="text" name="town" placeholder='Town' onChange={submitBooking}/>
            </div>
            <div className="input_check">
              <label htmlFor="">Street</label>
              <input type="text" name="street" placeholder='Street' onChange={submitBooking}/>
            </div>
          </div>
          <div className="checkout_input">
            <div className="input_check">
              <label htmlFor="">Email</label>
              <input type="email" name="email" placeholder='Email' onChange={submitBooking}/>
            </div>
            <div className="input_check">
              <label htmlFor="">Phone Number</label>
              <input type="text" name="phoneNo" placeholder='Phone Number' onChange={submitBooking}/>
            </div>
          </div>
          <button onClick={makePayment}>PROCEED TO PAYMENT</button>
        </form>
      </div>
      <div className="checkout2">
        <div className="check_sum">
          <h1>Order Summary</h1>
          <div className="summary">
            {
              cart.filter((item) => item.quantity && item.quantity > 0).map((item)=>{
                return(
                  <div className="summ">
                    <img src={item.image} alt="" />
                    <div className="sum1">
                      <h2>{item.name}</h2>
                      <p>{item.desc}</p>
                    </div>
                    <div className="sum2">
                      <h3>x{item.quantity}</h3>
                      <p>{item.price * item.quantity}</p>
                    </div>
                  
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Chectout