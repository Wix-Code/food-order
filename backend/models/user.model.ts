import mongoose from "mongoose";



// Define the CartSchema interface
interface CartSchema {
  productId:  mongoose.Types.ObjectId,
  name: string;
  desc: string;
  cat: string;
  price: number;
  quantity: number;
  image: string;
  URL?: string;
  alinkColor?: string;
}

// Define the UserSchema interface
interface UserSchema  {
  firstname: string;
  lastname: string;
  phoneNo: string;
  email: string;
  password: string;
  cart: CartSchema[],
}

// Define the Cart Schema
const cartSchema = new mongoose.Schema<CartSchema>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  name: { type: String, required: true },
  desc: { type: String, required: true },
  cat: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  URL: { type: String, required: false},
  alinkColor: { type: String, required: false},
});


const userSchema = new mongoose.Schema<UserSchema>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartSchema]
}, {
  timestamps: true, minimize: false 
})

const User = mongoose.model<UserSchema>('User', userSchema);

export default User;
