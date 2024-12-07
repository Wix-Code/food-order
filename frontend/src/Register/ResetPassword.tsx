import React, { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../Context/Context'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'

const ResetPassword = () => {

  const { setLoading, loading,  } = useContext(StoreContext)
  const navigate = useNavigate()
  const [err, setErr] = useState<boolean>(false)


  const query = new URLSearchParams(useLocation().search);
  //const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const id = query.get("id");
 
console.log("ugochukwu")
  console.log(id, "user id" )
  console.log(token, "user token" )

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
    setLoading(true);

    if (newPassword.password !== newPassword.confirmPassword) {
      alert("password do not match")
      return;
    }
    if (!token || !id) {
      alert("Token or ID is missing");
      console.error("Token:", token, "ID:", id);
      return;
    }
   
    const payload = {
      password: newPassword.password,
      confirmPassword: newPassword.confirmPassword,
    };
    const url = `https://food-order-1-p0hh.onrender.com/api/auth/resetpassword?id=${id}&token=${token}`;
    try {
      const res = await axios.post(url, payload ,{headers: {
        "Content-Type": "application/json",
      }, withCredentials: true});

      if (res.data.success) {
        alert(res.data.message,);
      } else {
        setErr(res.data.message);
      }
      navigate('/menu')
      setLoading(false)
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
  };


  return (
    <div className='signup'>
      <div className="sign1">
       <div className="signing">
        <h3>Reset Password</h3>
          <div className="sign2">
            <p>New Password</p>
            <input type="text" name='password' onChange={change} placeholder='New Password' required/>
          </div>
          <div className="sign2">
            <p>Confirm Password</p>
            <input type="text" name='confirmPassword' onChange={change} placeholder='Password' required/>
          </div>
          {
            err && (
              <div className="error">
                {err}
              </div>
            )
          }
          <div className="sig">
            <button onClick={handleSubmit} disabled={loading}>{ loading ? "Resetting Password..." : "Submit" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword