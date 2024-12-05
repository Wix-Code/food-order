import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import './rice.css'
import { StoreContext } from '../Context/Context';

const Ricee = () => {
  

  //const { addtocart } = useContext(StoreContext) 
  const { addtocart, data } = useContext(StoreContext);


  

  return (
  <div className='ricee'>
    <div className="rice">
      {data.filter((item : any) => item.cat === "Rice").map((dat : any)=> {
        return(
          <div className="dat" key={dat._id}>
            <h2>{dat.name}</h2>
            <h3>{dat.desc}</h3>
            <img src={dat.image} alt="" />
            <button onClick={()=>addtocart(dat)}>add to cart <span>${dat.price}</span></button>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default Ricee