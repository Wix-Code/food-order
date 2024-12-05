import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { StoreContext } from '../Context/Context';

const Product = () => {
  
  interface Cart {
    id: string,
    name: string,
    desc: string,
    price: number,
    image: string,
  }

  //const { addtocart } = useContext(StoreContext) 
  const { addtocart } = useContext(StoreContext);

  const [post, setPost] = useState<Cart[]>([])

 
  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      const res = await axios.post("http://localhost:5000/api/products");
     console.log(res)
     setPost(res.data);

    };
    // Call the function
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  

  return (
  <div className='ricee'>
    <div className="rice">
      {post.map((dat : any)=> {
        return(
          <div className="dat" key={dat._id}>
            <h2>{dat.name}</h2>
            <h3>{dat.description}</h3>
            <img src={dat.image} alt="" />
            <button onClick={()=>addtocart(dat)}>add to cart <span>${dat.add}</span></button>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default Product