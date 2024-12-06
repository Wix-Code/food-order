import React,{ useState, useEffect} from 'react'
import Piz from './Piz'
import Piza from './Piza'
import Icons from '../homepage/Icons'
import Loader from '../Loader/Loader'


const Pizza = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Piz />
      <Piza />
      <Icons />
    </div>
  )
}

export default Pizza