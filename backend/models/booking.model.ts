import mongoose from "mongoose";

interface Item {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
}

interface BookingSchema extends Document {
  userId:  mongoose.Types.ObjectId,
  firstname: string,
  lastname: string,
  state: string,
  lga: string,
  street: string,
  email: string,
  amount: number,
  town: string,
 // date: date,
  payment: boolean,
  status: string,
  phoneNo: string,
  items: Item[],
} 

const bookingSchema = new mongoose.Schema<BookingSchema>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  town: { type: String, required: true},
  lga: { type: String, required: true },
  payment: { type: Boolean, required: false },
  status: { type: String, default: "Food Processing" },
  amount: { type: Number, required: true },
  //date: { type: Date, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true }
  }]
}, {
  timestamps : true
})

const Booking = mongoose.model<BookingSchema>('Booking', bookingSchema);

export default Booking;