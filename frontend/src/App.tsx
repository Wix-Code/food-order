import React, { useState, useEffect } from 'react'
import './App.css'
import Rout from './Rout'
import Navbar from './navbar/Navbar'
import Footer from './Footer/Footer'
import Data from './Data'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import { toast, ToastContainer } from 'react-toastify'
import Loader from './Loader/Loader'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }

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