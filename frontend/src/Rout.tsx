import React  from 'react'
import { Routes, Route  } from 'react-router-dom'
import Beans from './Beans/Beans'
import Cart from './Cart/Cart'
import HomePage from './homepage/HomePage'
import Rice from './Rice/Rice'
import Mainmenu from './Menu/Mainmenu'
import Cakes from './Cakes/Cakes'
import Egusi from './Egusi/Egusi'
import Ogbono from './Ogbono/Ogbono'
import Snacks from './Snacks/Snacks'
import Pizza from './Pizza/Pizza'
import Drinks from './Drinks/Drinks'
import Signup from './Register/Signup'
import Regis from './Register/Regis'
import Register from './Register/Register'
import ResetPassword from './Register/ResetPassword'
import Shawama from './Shawa/Shawama'
import Products from './products/Products'
import Chectout from './CheckOut/Chectout'
import ForgotPassword from './Register/ForgotPassword'
import Verify from './Verify/Verify'
import OrderPage from './Order/OrderPage'


const Rout = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/menu/rice'  element={<Rice />}/>
        <Route path='/menu/beans'  element={<Beans />}/>
        <Route path='/menu/ogbono'  element={<Ogbono />}/>
        <Route path='/menu/cakes'  element={<Cakes />}/>
        <Route path='/menu/egusi'  element={<Egusi />}/>
        <Route path='/menu/drinks'  element={<Drinks />}/>
        <Route path='/menu/pizza'  element={<Pizza />}/>
        <Route path='/menu/snacks'  element={<Snacks />}/>
        <Route path='/menu/shawama'  element={<Shawama />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/menu' element={<Mainmenu />} />
        <Route path="/register" element={<Register />}/>
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/login' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/regis' element={<Regis />} />
        <Route path='/check' element={<Chectout />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorder' element={<OrderPage />} />
      </Routes>
    </div>
  )
}

export default Rout