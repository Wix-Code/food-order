import React,{ useState, useEffect} from 'react'
import Snac from './Snac'
import Loader from '../Loader/Loader'
import Snack from './Snack'
import Icons from '../homepage/Icons'

const Snacks = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Snac />
      <Snack/>
      <Icons />
    </div>
  )
}

export default Snacks