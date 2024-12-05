import mongoose from "mongoose";

interface ProductSchema extends Document {
  name: string,
  desc: string,
  cat: string,
  price: number,
  image: string,
} 

const productSchema = new mongoose.Schema<ProductSchema>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true // created at, updated at
})

const Product = mongoose.model<ProductSchema>('Product', productSchema);

export default Product;