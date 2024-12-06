import React, { useState, useContext } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Context/Context'
import axios from "axios"


const ForgotPassword = () => {

  interface Email {
    email: string
  }

  const [err, setErr] = useState<boolean>(false)

  const [ input, setInput] = useState<Email>({
    email: ""
  })

  const { setLoading, loading } = useContext(StoreContext)

  const change = (e : any) => {
    setInput((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const submit = async (e : any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('https://food-order-1-p0hh.onrender.com/api/auth/forgotpassword',input, {
        withCredentials: true,
      })
      console.log(input)
      
      if (!res.data.success) {
        setErr(res.data.message);
      }

      alert("message sent to your email")
      //navigate('/login')
      setLoading(false)
      console.log(res.data)
    } catch (error : any) {
      if (error.response && error.response.data) {
        const { success, message } = error.response.data;

        // Handle the `success === false` case
        if (success === false) {
          console.error('Error:', message); // Logs "Invalid email or password"
        }
        setErr(message)
        console.log(error, "is error")
      }
      setLoading(false)
    }
  }


  return (
    <div className='signup'>
      <div className="sign1">
       <div className="signing">
        <h3>Forgot Password</h3>
          <div className="sign2">
            <p>Email</p>
            <input type="email" name='email' onChange={change} placeholder='Email'/>
          </div>
          {
            err && (
              <div className="error">
                {err}
              </div>
            )
          }
          <div className="sig">
            <button onClick={submit} disabled={loading}>{ loading ? "Submitting..." : "Submit" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword