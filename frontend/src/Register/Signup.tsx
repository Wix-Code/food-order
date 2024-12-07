import React, { useContext } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Context/Context'

const Signup = () => {

  const { change, submit, loading, error } = useContext(StoreContext)
  return (
    <div className='signup'>
      <div className="sign1">
       <div className="signing">
        <h3>Sign In</h3>
          <p>Don't have an account? <Link to='/register'><span>Register</span></Link></p>
          <div className="sign2">
            <p>Email</p>
            <input type="text" name='email' onChange={change} placeholder='Input your email' required/>
          </div>
          <div className="sign2">
            <p>Password</p>
            <input type="text" name='password' onChange={change} placeholder='Password' required/>
            <Link to='/forgotpassword'><span>Forgot password?</span></Link>
          </div>
          {
            error && (
              <div className="error">
                {error}
              </div>
            )
          }
          <div className="sig">
            <button onClick={submit} disabled={loading}>{ loading ? "Signing In" : "Sign In" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup