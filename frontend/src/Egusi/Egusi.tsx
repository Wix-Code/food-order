import React,{ useState, useEffect} from 'react'
import Egus from './Egus'
import Egusii from './Egusii'
import Icons from '../homepage/Icons'
import Loader from '../Loader/Loader'


const Egusi = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Egus />
      <Egusii />
      <Icons />
    </div>
  )
}

export default Egusi