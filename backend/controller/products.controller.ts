import { RequestHandler } from 'express';
import Product from '../models/product.model.ts';



export const addProduct : RequestHandler = async (req,res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.desc || !product.price || !product.image || !product.cat) {
    res.status(400).json({success : false, message: "Please provide all fields"});
  }


  try {

    const newProduct = new Product(product);

    await newProduct.save();

    res.status(200).json({success : true, data: newProduct});
  } catch (error : any) {
    console.error("Error in posting products");
  }
}

export const getSingleProduct : RequestHandler = async (req,res) => {

  const id = req.params.id
  try {
    const single = await Product.findById(id)
    console.log(id)

    res.status(400).send({success: true, message: "Product fetched", single})
  } catch (error) {
    res.status(400).send({success: false, message: "Error fetching product"})
    console.log(error)
  }
}

export const getAllProducts : RequestHandler = async (req,res)  => {
  try {

    const products = await Product.find({});

    res.status(200).json({success: true, data: products});

    return;
  } catch (error) {
    console.log(error)
    res.status(400).json({success: false, message: "Error in fetching all products"});
    return;
  }
}

export const updateProduct : RequestHandler = async (req,res) => {

  const {id} = req.params

  try {

    const updateProduct = await Product.findById(id)

    if(!updateProduct){
      res.status(400).send({success: false, message: "Product not found"})
      return;
    }

    const updated = await Product.findByIdAndUpdate(id, req.body,{
      new: true,
      runValidators: true,
    })

    res.status(400).send({success: true, message: "Product updated", updated})
    
  } catch (error) {
    res.status(400).send({success: false, message: "Error updating product"})
    console.log(error)
  }
}

export const deleteProduct : RequestHandler = async (req,res) => {
  
  const {id} = req.params;
  
  try{

    const single = await Product.findById({id})
    
    if(!single){
      res.status(404).json({success: false, message: "Product not found"})  //if product not found
    }

    const updated = await Product.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true, message: "Product deleted", updated
    })
  }
  catch(error){
    res.status(400).send({success: false, message: "Error in deleting product"})
    console.log(error);
  }
}
