import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { connectDB } from './db.ts';

import userRoutes from "./routes/user.route.ts"
import authRoutes from "./routes/auth.route.ts"
import cartRoutes from "./routes/cart.route.ts"
import productRoutes from "./routes/products.route.ts"
import orderRoutes from "./routes/booking.route.ts"



dotenv.config();

//const PORT = process.env.PORT || 5000
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // or use '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // if you're using cookies or session
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes);

//const PORT = process.env.PORT || 5001;  // Change from 5000 to 5001 or any other port


app.listen(5000, () => {
  console.log('Connected');
  connectDB();
});