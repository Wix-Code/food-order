import React,{ useState, useEffect} from 'react'
import Icons from '../homepage/Icons'
import Ogbon from './Ogbon'
import Ogbo from './Ogbo'
import Loader from '../Loader/Loader'


const Ogbono = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Ogbo />
      <Ogbon />
      <Icons />
    </div>
  )
}

export default Ogbono