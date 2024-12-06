import React, { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../Context/Context'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'

const ResetPassword = () => {

  const { setError, setLoading, loading, } = useContext(StoreContext)
  const navigate = useNavigate()

  const query = new URLSearchParams(useLocation().search);
  //const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const id = query.get("id");

  console.log(id )
  console.log(token )

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!token || !id) {
      alert("No token");
    }
  }, [token, id]);

  const change = (e : any) => {
    setNewPassword((prev) => ({...prev,[e.target.name] : e.target.value}))
  }
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.password !== newPassword.confirmPassword) {
      alert("password do not match")
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://food-order-1-p0hh.onrender.com/api/auth/resetpassword", {
        token, id,
        newPassword: newPassword
      },{ withCredentials: true});

      if (res.data.success) {
        alert(res.data.message,);
      } else {
        setError(res.data.message);
      }
      navigate('/menu')
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className='signup'>
      <div className="sign1">
       <div className="signing">
        <h3>Reset Password</h3>
          <div className="sign2">
            <p>New Password</p>
            <input type="text" name='password' onChange={change} placeholder='New Password'/>
          </div>
          <div className="sign2">
            <p>Confirm Password</p>
            <input type="text" name='confirmPassword' onChange={change} placeholder='Password' />
          </div>
          <div className="sig">
            <button onClick={handleSubmit}>{ loading ? "Resetting Password..." : "Submit" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword