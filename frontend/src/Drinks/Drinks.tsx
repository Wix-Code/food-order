import React,{ useState, useEffect} from 'react'
import Drin from './Drin'
import Drink from './Drink'
import Icons from '../homepage/Icons'
import Loader from '../Loader/Loader'


const Drinks = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Drin />
      <Drink />
      <Icons />
    </div>
  )
}

export default Drinks