import React, {useContext} from 'react';
import { StoreContext } from '../Context/Context';

const Drink : React.FC= () => {
  
  const { addtocart, data } = useContext(StoreContext) 
  
  return (
  <div className='ricee'>
    <div className="rice">
      {data.filter((item : any) => item.cat === "Drink").map((dat : any)=> {
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

export default Drink