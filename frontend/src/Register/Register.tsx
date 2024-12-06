import React, { useContext, useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../Context/Context'

const Register = () => {

  const { loading, setLoading, error, setError} = useContext(StoreContext)

  const navigate = useNavigate()

  interface User {
    firstname: string;
    lastname: string;
    email: string;
    phoneNo: string;
    password: string;
    confirmPassword: string;
  }

  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  })

  const change = (e : any) => {
    setUser((prev) => ({...prev,[e.target.name] : e.target.value}))
  }

  const submit = async (e : any) => {
    e.preventDefault()
    setLoading(true)

    if(user.password !== user.confirmPassword){
      alert("error")
      setLoading(false)
    }

    try {
      const res = await axios.post('https://food-order-1-p0hh.onrender.com/api/auth/register', user, {
        withCredentials: true,
      })
      
      if (!res.data.success) {
        setError(res.data.message);
      }
      navigate('/login')
      setLoading(false)
      console.log(res.data)
    } catch (error) {
      console.error("Registration error:", error);
      console.log(error)
    }

    console.log(user)
  }

  return (
    <div className='signup'>
      <div className="sign1">
        <div className="signing">
          <h3>Register</h3>
          <p>Have an account? <Link to='/login'><span>Sign In</span></Link></p>
          <div className="sign2">
            <p>First Name</p>
            <input type="text" name='firstname' placeholder='First Name' onChange={change} required/>
          </div>
          <div className="sign2">
            <p>Last Name</p>
            <input type="text" name='lastname' placeholder='Last Name' onChange={change} required/>
          </div>
          <div className="sign2">
            <p>Email</p>
            <input type="text" name='email' placeholder='Email' onChange={change} required/>
          </div>
          <div className="sign2">
            <p>Phone No</p>
            <input type="text" name='phoneNo' placeholder='Phone No' onChange={change} required/>
          </div>
          <div className="sign2">
            <p>Password</p>
            <input type="text" name='password' placeholder='Password'  onChange={change} required/>
          </div>
          <div className="sign2">
            <p>Confirm Password</p>
            <input type="text" name='confirmPassword' placeholder='Confirm Password'  onChange={change} required/>
          </div>
          {
            error && (
              <div className="error">
                {error}
              </div>
            )
          }
          <div className="sig">
            <button onClick={submit} disabled={loading}>{ loading ? "Submitting" : "Register"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register