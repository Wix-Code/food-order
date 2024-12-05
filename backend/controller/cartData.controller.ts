import { RequestHandler } from "express"
import User from "../models/user.model.ts";
import mongoose from "mongoose";


export const addCart : RequestHandler = async (req, res) =>{

  const {productId, name, desc, price, cat, image } = req.body

  try{
    const user = await User.findById(req.body.id)
    if(!user){
      res.status(400).send({success: false, message: "User not found in cart"})
      return;
    } 
  // Convert to ObjectId if necessary

    const productIdAsString = productId.toString();

    // Debugging logs
    //console.log("Request productId:", productId, typeof productId);
    //console.log("Cart productIds:", user.cart.map((item) => item.productId), user.cart.map((item) => typeof item.productId));

  // Find if the product already exists in the cart
    const add = user.cart.find((item) => item.productId.toString() === productIdAsString);

    console.log(add, "add id")

    if(!add){
      user.cart.push({productId: productId, name: name, price: price, cat: cat, image: image, quantity : 1, desc: desc} )
    }else{
     
      add.quantity += 1;
    }

    await user.save();

    res.json({success:true,message:'Added to cart', cartData: user.cart, add});

   // console.log(user)

  }catch(error){
    console.log(error)

    res.status(400).send({success: false, message: "product not added to cart"})
  }
}

export const removeCart : RequestHandler = async (req, res) =>{

  const {productId} = req.body

  try {
    // Find the user by ID
    const user = await User.findById(req.body.id);
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    // Find the item in the cart
    const existingItem = user.cart.find((item) =>
      item.productId.toString() === productId.toString() // Proper ObjectId comparison
    );

    if (!existingItem) {
      // If the item doesn't exist in the cart, return an error
      res.status(400).json({ success: false, message: "Product not found in cart" });
      return;
    }

    // Decrease the quantity or remove the item if quantity reaches 0
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1; // Decrease quantity
    } else {
      user.cart = user.cart.filter((item) => item.productId.toString !== productId.toString()); // Remove item
    }

    // Save the updated user document
    await user.save();

    res.json({ success: true, message: "Cart updated", cartData: user.cart });
  }catch(error){
    console.log(error)
  }
}

export const removeFromCart: RequestHandler = async (req, res) => {
  const { id, productId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    // Check if the product exists in the cart
    const itemExists = user.cart.some((item) =>
      item.productId.equals(productId) // Proper ObjectId comparison
    );

    if (!itemExists) {
      res.status(400).json({ success: false, message: "Product not found in cart" });
      return;
    }

    // Remove the item from the cart
    user.cart = user.cart.filter((item) => !item.productId.equals(productId));

    // Save the updated user document
    await user.save();

    res.json({ success: true, message: "Removed from cart", cartData: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to remove product from cart", error });
  }
};

export const getCart : RequestHandler = async (req,res) =>{

  const {id} = req.body;

  try {
      const user = await User.findById(id)

      if(!user){
        res.status(400).send({success: false, message: "User not found"})
        return;  //if user not found
      }

      const cartData =  user.cart;

      res.status(200).send({success:true, cartData});
  } catch (error) {
      console.log(error) ;
      res.status(500).send({success:false, message:'Error'});
  }
}

export const pushCart : RequestHandler = async ( req, res ) => {

  const { id, cart } = req.body;

  try {
    // Validate inputs
    if (!id || !Array.isArray(cart)) {
      res.status(400).send({ success: false, message: "Invalid userId or cart data" });
      return ;
    }

    // Find the user and update their cart
    const user = await User.findById(id);

    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
      return;
    }

    const updatedCart = [...user.cart];

    cart.forEach((item) => {
      const exists = updatedCart.find((existingItem) => existingItem.productId === item.productId);
      if (!exists) {
        updatedCart.push(item);
      }
    });

    user.cart = updatedCart;

    // Update the user's cart in the database
    await user.save();

    res.status(200).send({ success: true, message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).send({ success: false, message: "Failed to update cart" });
  }  
  
}

export const clearCart : RequestHandler = async (req,res) =>{

  const {id} = req.body;

  try {
      const user = await User.findById(id)

      if(!user){
        res.status(400).send({success: false, message: "User not found"})
        return;  //if user not found
      }

      const result = await User.findByIdAndUpdate(
        id,
        { cart: [] }, // Assuming the cart field exists on the User schema
        { new: true } // Return the updated document
      );
  
      if (!result) {
         res.status(404).send({ success: false, message: "User not found" });
         return;
      }
  
      res.status(200).send({
        success: true,
        message: "Cart cleared successfully",
        result,
      });
  } catch (error) {
      console.log(error) ;
      res.status(500).send({success:false, message:'Error'});
  }
}