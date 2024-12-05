import React, { useState } from 'react'
import './App.css'
import Rout from './Rout'
import Navbar from './navbar/Navbar'
import Footer from './Footer/Footer'
import Data from './Data'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  /*const[detail, setDetail] =useState(Data)
  const [cart, setCart] = useState ([])

 const addtocart = (product) => {
      const exist = cart.find((x) => {
      return x.id === product.id
    })

    if (exist) {
      toast.success("Already Added to Cart");
    } 

    else {
      setCart ([...cart, {...product, qty : 1 }])
      toast.success("Added to Cart");
    }
 }*/
  
  return (
    <div>
      <ScrollToTop />
      <ToastContainer position='top-center'
      autoClose={2000} />
      <Navbar />
      <Rout />
      <Footer />
    </div>
  )
}

export default App