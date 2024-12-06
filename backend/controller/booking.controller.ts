import { RequestHandler } from "express";
import User from "../models/user.model";
import Booking from "../models/booking.model";
import { paystack } from "../paystack";
import { uptime } from "process";



export const postBooking : RequestHandler = async (req, res) => {
    
  const frontend_url = "https://food-orderng.vercel.app";

  try{
    
    /*const user = await User.findById({userId: req.body.userId})
    if(!user){
      res.status(400).send({success: false, message: "User not found"})
      return;
    }*/

      if (!req.body.items || !Array.isArray(req.body.items)) {
        throw new Error("Invalid items: 'items' is required and must be an array");
      }

      console.log("Request Body:", req.body);


    const itemsTotal = req.body.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    console.log(itemsTotal)
      
    console.log(req.body.items, "items")

    const order = new Booking({
      userId:  req.body.userId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      state: req.body.state,
      lga: req.body.lga,
      street: req.body.street,
      amount: itemsTotal,
      town: req.body.town,
    // date: date,
      phoneNo: req.body.phoneNo,
      items: req.body.items,
    })

    await order.save()

    const line_items = req.body.items.map((item : any)=>({
      price_data :{
          currency: "ngn",
          product_data:{
            productId: item._id,
            name: item.name,
            desc: item.desc,
            price: item.price
          },
          unit_amount:Math.round(item.price * 100)
      },
      quantity: item.quantity
    }))

    const DELIVERY_FEE = 1000;

    const totalAmount = itemsTotal + DELIVERY_FEE

    line_items.push({
      price_data :{
          currency:"ngn",
          product_data:{
            name:"Delivery Charges"
          },
          unit_amount:DELIVERY_FEE * 100
      },
      quantity:1
    })
     
     // Initialize Paystack transaction
    const response = await paystack.transaction.initialize({
      email: req.body.email, // User's email
      amount: (totalAmount * 100).toString(), // Convert Naira to Kobo
      currency: "NGN",
      callback_url: `${frontend_url}/verify?orderId=${order._id}`, // Redirect after payment
      metadata: {
        orderId: order._id, // Track the order
        custom_fields: req.body.items.map((item: any) => ({
          display_name: item.name,
          value: item.quantity,
        })),
      },
    });

    res.status(200).send({success: true, message: "Booking created successfully", order: line_items, totalAmount: totalAmount, session: response})
  }catch(error){
    console.log(error)
  }
}


interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: 'success' | 'failed';
    reference: string;
    gateway_response: string,
    amount: number;
    metadata?: {
      orderId?: string;
    };
  }
}

export const verifyPayment: RequestHandler = async (req, res) => {
  try {

    console.log("Query parameters:", req.query)
    // Extract reference and orderId from query parameters
    const reference = req.body.reference as string;
    const orderId = req.body.orderId as string;


    console.log("Extracted reference:", reference);
    console.log("Extracted orderId:", orderId);
    // Validate input parameters
    if (!reference || !orderId) {
       res.status(400).send({
        success: false,
        message: "Payment reference and Order ID are required"
      });
      return;
    }

    // Verify transaction with Paystack
    const response = await paystack.transaction.verify(reference) as PaystackVerifyResponse;

    // Validate Paystack response
    if (!response || !response.data) {
     res.status(400).send({
        success: false,
        message: "Invalid payment response from Paystack"
      });
      return;
    }

    // Check transaction status
    /*if (response.data.status !== 'success') {
       res.status(400).send({
        success: false,
        message: "Payment verification failed",
        details: response.data
      });
      return;
    }*/

      const transaction = response.data;

    // Check if payment was successful
    if (transaction.status !== "success") {
       res.status(400).send({
        success: false,
        message: "Payment verification failed",
        details: {
          transaction_status: transaction.status,
          gateway_response: transaction.gateway_response,
        },
      });
      return;
    }

    // Find and update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      orderId,
      {
        $set: {
          paid: true,
          status: 'paid',
          paymentReference: reference,
          paidAt: new Date(),
          paymentAmount: response.data.amount / 100 // Convert from kobo to naira
        }
      },
      { new: true }
    );

    console.log(updatedBooking, "come")
    // Check if booking exists
    if (!updatedBooking) {
       res.status(404).send({
        success: false,
        message: "Booking not found"
      });
      return;
    }

     // Clear the user's cart
     await User.findByIdAndUpdate(
      updatedBooking.userId,
      { $set: { cart: [] } }, // Assuming the cart is stored in the User model
      { new: true }
    );

    // Successful verification response
     res.status(200).send({
      success: true,
      message: "Payment verified successfully",
      data: {
        booking: updatedBooking,
        transaction: response.data
      }
    });

    console.log (updatedBooking )

  } catch (error) {
    console.error("Payment verification error:", error);
    
     res.status(500).send({
      success: false,
      message: "Internal server error during payment verification",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
};

export const userOrders : RequestHandler = async (req,res) => {
  try {
    const orders = await Booking.find({userId:req.body.userId})
    res.send({success:true, data:orders})
  } catch (error) {
    console.log(error)
    res.send({success:false, message:"Error"})
  }
}