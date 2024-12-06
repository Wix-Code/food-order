import React,{ useState, useEffect} from 'react'
import Cak from './Cak'
import Cake from './Cake'
import Icons from '../homepage/Icons'
import Loader from '../Loader/Loader'


const Cakes = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Cak />
      <Cake />
      <Icons />
    </div>
  )
}

export default Cakes