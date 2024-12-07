import React, { useState, useEffect} from 'react'
import Homeie from './Homeie'
import Story from './Story'
import Order from './Order'
import Icons from './Icons'
//import Loader from '../Loader/Loader'


const HomePage = () => {
 /*const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }*/
  return (
    <div>
      <Homeie />
      <Story />
      <Order />
      <Icons />
    </div>
  )
}

export default HomePage