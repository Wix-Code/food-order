import React,{ useState, useEffect} from 'react'
import Icons from '../homepage/Icons'
import Ricee from './Ricee'
import Ric from './Ric'
import Loader from '../Loader/Loader'


const Rice = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Ric />
      <Ricee />
      <Icons />
    </div>
  )
}

export default Rice