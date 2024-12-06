import React,{ useState, useEffect} from 'react'
import Shawa from './Shawa'
import Shawam from './Shawam'
import Loader from '../Loader/Loader'
import Icons from '../homepage/Icons'

const Shawama = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
    <Shawa />
    <Shawam />
    <Icons />
  </div>
  )
}

export default Shawama