import React,{ useState, useEffect} from 'react'
import Menu from './Menu'
import Icons from '../homepage/Icons'
import Loader from '../Loader/Loader'
import Deliver from './Deliver'

const Mainmenu = () => {

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div>
      <Deliver />
      <Menu />
      <Icons />
    </div>
  )
}

export default Mainmenu