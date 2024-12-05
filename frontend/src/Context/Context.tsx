import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

 // Define the type for your cart item
 interface CartItem {
  _id: string;
  productId: string;
  name: string;
  desc: string;
  cat: string;
  price: number;
  image: string;
  quantity: number;

}

interface DataItem {
  id: string;
  desc: string;
  cat: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface User {
  email: string;
  password: string;
}

// Define the shape of your context
interface CartContextType {
  cart: CartItem[];
  data: DataItem[];
  addtocart: (product : CartItem) => void | undefined;
  inc: (product : CartItem) => void | undefined;
  dec: (product : CartItem) => void | undefined;
  clear: (product : CartItem) => void | undefined;
  total: number;
  loading: boolean;
  error: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  submit: () => void;
  change: () => void;
  token: string;
  setToken: () => void;
  setCart: (cart: CartItem[]) => void;
}

export const StoreContext = React.createContext<CartContextType>({
  cart: [],
  data: [],
  addtocart: () => {}, 
  inc: () => {},
  dec: () => {},
  clear: () => {},
  total: 0,
  loading: false,
  error: false,
  setLoading: () => {},
  change: () => {},
  submit: () => {},
  setError: () => {},
  setCart: (cart: CartItem[]) => {},
  token: "",
  setToken: () => {},
}) 

const Context = (props : any) => {

  const [cart, setCart] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const navigate = useNavigate()

  console.log( "this is cart", cart)

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  })

  const userData = localStorage.getItem('user');

  const userId = userData ? JSON.parse(userData) : null;
  const id = userId?.user?._id

  console.log(id)

 

  //const[detail, setDetail] =useState(Data)

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      withCredentials: true
    })
    setData(res.data.data)
    console.log(res.data)
  }

  const fetchCart = async (id : string) => {
      const res = await axios.post('http://localhost:5000/api/cart/get', {id})
      return res.data.cartData
      //console.log(res.data)
  }


  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData();
        
        //const token = localStorage.getItem("token");
        //const userId = localStorage.getItem("user") || "";
  
        if (!id) {
          //setToken(user); // Ensure setToken accepts a string
        console.log("log")
        const savedCart = localStorage.getItem("guestCart");
        const cart = savedCart ? JSON.parse(savedCart) : [];
        if (Array.isArray(cart) && cart.length > 0) {
          setCart(cart);
        } else {
          localStorage.removeItem("guestCart");
        }
        console.log("Loaded cart:", cart);
        }
        const car = await fetchCart(id);
        if (Array.isArray(car) && car.length > 0) {
          setCart(car);
        } else {
          console.log("Cart is empty or invalid data received");
        }
        //setCart(car);
        console.log( "This is car", car)
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
    loadData();
  }, []);


  const submit = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', user, {
        withCredentials: true, 
      },)
      //setToken(res.data.token)
      
      
      if (res.data.success) {
        setError(res.data.message);
        const userId = res.data.user._id
        console.log("user id", userId)
        const cartData = localStorage.getItem("guestCart");

        console.log(cartData, "cartData")

        //const cartResponse = JSON.parse(cartData)

        if(cartData){

          const parsedData = JSON.parse(cartData)
          //const productId = product.productId;


          /*if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log("Parsed Cart:", parsedData)};*/

            const processedCartData = parsedData.map((item: any) => ({
              _id: item._id,  // Ensure _id is used instead of productId
              productId: item.productId,  // Ensure _id is used instead of productId
              name: item.name,
              desc: item.desc,
              price: item.price,
              cat: item.cat,
              image: item.image,
              quantity: item.quantity || 1
            }));
  
            // Validate cart items
            /*const isValidCart = processedCartData.every((item: any) => 
              item._id && 
              typeof item._id === "string" && 
              item.name && 
              item.price
            );
            //const isValidCart = parsedData.every((item : any) => item.productId && typeof item.productId === "string");

            console.log(isValidCart)

            if (!isValidCart) {
              console.error("Invalid cart data: One or more items are missing productId.");
              console.log("Invalid items in parsedData:", parsedData.filter((item: any) => !item.productId || typeof item.productId !== "string"));

              return;
            }*/

            const cartPayload = {
              id: userId, // User ID
              cart: processedCartData, // Cart array
            };

            console.log("Payload being sent to backend:", cartPayload);


          const cartResponse = await axios.post('http://localhost:5000/api/cart/push',cartPayload,{
            withCredentials: true, // Ensures cookies or credentials are sent
          });

          if (cartResponse.data){
            console.log(" cart successfully saved to database")
          }

          localStorage.removeItem("guestCart");

        }
      }
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/menu')
      setLoading(false)
      //console.log(res.data)
    } catch (error) {
      console.error("Registration error:", error);
      console.log(error)
    }

    console.log(user)
  }

  const change = (e : any) => {
    setUser((prev) => ({...prev,[e.target.name] : e.target.value}))
  }

  const addtocart = (product : CartItem) => {
    const productId = product._id || product.productId;

      const exist = cart.find((x : any) => {
      return x.productId === productId
    })
    console.log(exist, "exist is here")
    console.log(cart, "cart is here")
    //console.log( typeof (exist), "car is here")
    console.log( typeof (productId),  "product id is here")

    if (exist) {
      toast.success("Already Added to Cart");
      return;
    } 

    const newCartData = {
      id: id,
      productId: productId,  // Make sure this matches your MongoDB _id
      name: product.name,
      desc: product.desc,
      price: product.price,
      cat: product.cat,
      image: product.image,
      quantity: 1
    };

    if(id){
      console.log(id, "user's id in cart")

      axios.post('http://localhost:5000/api/cart/add', newCartData,{ 
        headers: { 
          'Authorization': `Bearer ${id}`,  // If you're using Bearer token
          'Content-Type': 'application/json'
        },
        withCredentials: true  // If using cookies
      })
      setCart([...cart,{...newCartData}]);
      toast.success("Added to user's cart in database")
    }
    else {
      // For unauthenticated users, store the cart in localStorage
      const updatedCart = [...cart, newCartData];
      console.log(updatedCart, "Updated cart is here")
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart); // Update the cart state
      toast.success("Product added to cart as a guest!");
    }
}

  const inc = (product : CartItem) => {

    const newCart = [...cart];

    console.log(newCart, "new cart")

    const productId = product.productId;


    const exist = newCart.find((x : any) =>  x.productId === productId 
    ) 
    console.log(productId,  "product id is here")

    if (!productId) {
      console.log("Product ID is missing:", product);
    }
    console.log(exist, "exist is heerre")

    if(exist){
      const updatedCart = newCart.map((x : any) =>
        x.productId === productId
          ? { ...x, quantity: x.quantity + 1 } // Increment quantity
          : x
      );
    
      setCart(updatedCart);
    }

    if(id){
      axios.post('http://localhost:5000/api/cart/add', {
        id: id,
        productId: productId,
        name: product.name,
        desc: product.desc,
        price: product.price,
        cat: product.cat,
        image: product.image,
        quantity:exist.quantity + 1,
    },{ 
        headers: { 
          'Authorization': `Bearer ${id}`,  // If you're using Bearer token
          'Content-Type': 'application/json'
        },
        withCredentials: true  // If using cookies
      })
    }else{
      const currentCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      console.log(currentCart, "current cart")
      const updatedCart =  currentCart.map((dat : any) => {
        return dat.productId === productId ? {...dat,quantity : dat.quantity + 1} : dat
      })
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart)
    } 
  }

  const dec = (product : CartItem) => {

    const newCart = [...cart];

    console.log(newCart, "new cart")

    const productId = product.productId;


    const exist = newCart.find((x : any) =>  x.productId === productId 
    ) 
    console.log(productId,  "product id is here")

    if (!productId) {
      console.log("Product ID is missing:", product);
    }
    console.log(exist, "exist is heerre")

    if(exist){
      const updatedCart = newCart.map((x : any) =>
        x.productId === productId
          ? { ...x, quantity: x.quantity - 1 } // Increment quantity
          : x
      );
    
      setCart(updatedCart);
    }

    if(id){
      console.log(id, "increament")
      axios.post('http://localhost:5000/api/cart/decrease', {
        id: id,
        productId: productId,
        name: product.name,
        desc: product.desc,
        price: product.price,
        cat: product.cat,
        image: product.image,
        quantity:exist.quantity - 1,
    },{ 
        headers: { 
          'Authorization': `Bearer ${id}`,  // If you're using Bearer token
          'Content-Type': 'application/json'
        },
        withCredentials: true  // If using cookies
      })
    }else{
      const currentCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      console.log(currentCart, "current cart")
      const updatedCart =  currentCart.map((dat : any) => {
        return dat.productId === productId ? {...dat,quantity : dat.quantity - 1} : dat
      })
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart)
    } 
  }

  /*const dec = (product : CartItem) => {
    const productId = product.productId;

    const exist = cart.find((dat) => {
      return dat._id === productId
    }) 
    if (exist) {
      if (exist.quantity === 1) {
          // Remove the product if the quantity is 1
          setCart(cart.filter((dat) => dat._id !== productId));
      } else {
          // Decrement the quantity otherwise
          setCart(
            cart.map((dat) =>
                dat._id === productId ? { ...dat, quantity: dat.quantity - 1 } : dat
            )
          );
      }
    }
    if(id){

      axios.post('http://localhost:5000/api/cart/decrease',   {
        productId: productId,
        quantity: exist.quantity - 1,
    },{ 
        headers: { 
          'Authorization': `Bearer ${id}`,  // If you're using Bearer token
          'Content-Type': 'application/json'
        },
        withCredentials: true  // If using cookies
      })
    }
  }*/

  const clear = (product : CartItem) => {
    const productId = product.productId;

    const exist = cart.find((dat : any) => {
      return dat.productId === productId
    }) 

    console.log(exist, "Clear")
    if(exist.quantity > 0){
      setCart(
        cart.filter((dat) => {
          return dat.productId !== productId;
        })
      )
    }
    if(id){

      axios.post('http://localhost:5000/api/cart/remove',   {
        id,
        productId
    },{ 
        headers: { 
          'Authorization': `Bearer ${id}`,  // If you're using Bearer token
          'Content-Type': 'application/json'
        },
        withCredentials: true  // If using cookies
      })
    } else{
      const cartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const updatedCart = cartData.filter((dat: CartItem) => dat.productId !== productId);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart)  
      toast.success("Item Removed from local storage");  
    }
    toast.success("Item Removed");
  }

  const total = cart.reduce((add, item) =>  add + item.quantity * item.price, 0)

  console.log(total, "Total amount")
  

  const values : any = {
    user, setUser, submit, loading, setLoading, addtocart, total, clear, inc, dec, error, setError, change, data, setToken, token,cart, id
  }

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default Context