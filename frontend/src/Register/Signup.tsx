import React, { useContext } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Context/Context'

const Signup = () => {

  const { change, submit, loading } = useContext(StoreContext)
  return (
    <div className='signup'>
      <div className="sign1">
       <div className="signing">
        <h3>Sign In</h3>
          <p>Don't have an account? <Link to='/register'><span>Register</span></Link></p>
          <div className="sign2">
            <p>Email or Phono No</p>
            <input type="text" name='email' onChange={change} placeholder='Input your email or phone number'/>
          </div>
          <div className="sign2">
            <p>Password</p>
            <input type="text" name='password' onChange={change} placeholder='Password'/>
            <Link to='/menu/forgot'><span>Forgot password?</span></Link>
          </div>
          <div className="sig">
            <button onClick={submit} disabled={loading}>{ loading ? "Logging In" : "Sign In" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup