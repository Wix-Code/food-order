import React,{ useState, useEffect} from 'react'
import Icons from '../homepage/Icons'
import Bean from './Bean'
import Bea from './Bea'
import Loader from '../Loader/Loader'


const Beans = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Bea />
      <Bean />
      <Icons />
    </div>
  )
}

export default Beans