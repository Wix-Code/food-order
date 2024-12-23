import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../Context/Context';
import Loader from '../Loader/Loader';

const Verify = () => {

  const userData = localStorage.getItem('user');
  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("reference")
  const orderId = searchParams.get("orderId")
  const navigate = useNavigate();
  const {setCart, cart} = useContext(StoreContext)
  const [loader, setLoader] = useState(true)

  console.log(success)
  console.log(orderId)

  

  /*const clearCart = async () => {

    //const data = {
    //  id: id,
    //  cart: cart
   // }
    await axios.post("https://food-order-1-p0hh.onrender.com/api/cart/clear", {id}, {
      withCredentials : true
    })
  }*/
    useEffect(()=>{
      verifyPayment();
    },[])
  
    useEffect(() => {
      setTimeout(() => setLoader(false), 3000)
    }, [])


  const verifyPayment = async () =>{
    const response = await axios.post("https://food-order-1-p0hh.onrender.com/api/order/verify",{orderId : orderId, reference: success},{
      withCredentials: true
    });
    if(response.data.success){
        navigate('/myorder');
       //await clearCart();

    }
    else{
        navigate('/')
    }
  }

  if (loader) {
    return <Loader />
  }
  
  return (
    null
  )
}

export default Verify