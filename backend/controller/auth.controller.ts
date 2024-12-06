import { RequestHandler } from "express"
import validator from "validator"
import bcrypt from "bcryptjs"
import User from "../models/user.model.ts";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const secretToken : any = `${process.env.JWT_TOKEN}` ;

export const registerUser : RequestHandler = async (req, res) : Promise<void> => {

  const {password, confirmPassword, phoneNo, email, ...others} = req.body;

  if(!validator.isEmail(email)){
   res.status(404).send({success: false, message: "Invalid Email"});
   return;
  }

  if(password.length < 8){
    res.status(404).send({success: false, message: "Password must be at least 8 characters"})
    return;
  }

  if(password !== confirmPassword){
    res.status(404).send({success: false, message: "Password does not match"})
    return;
  }
  try {
    
    const find = await User.findOne({email:email})
    if(find){
    res.status(404).send({success: false, message: "Email exists"})
    return;
    }

    const hash = bcrypt.hashSync(password, 10);

    const user = new User({...others, phoneNo: phoneNo, email: email, password: hash})
    res.status(200).send({success: true, message: "registeration successfully done", user})
    await user.save()
    return;
  
  } catch (error) {
    res.status(400).send({success: false, message: "registration failed"})
    console.log(error)
    return;
  }
}

export const loginUser : RequestHandler = async (req,res) => {

  const {email, phoneNo, password } = req.body

  try {
    
    const user = await User.findOne({ $or: [{email}, {phoneNo}] });

    if (!user) {
      res.status(400).send({ success: false, message: "User not found" });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      res.status(400).send({ success: false, message: "Password is incorrect" });
      return;
    }

    // Convert user document to an object and omit the password field
    const { password: _, ...userWithoutPassword } = user.toObject();

    const  token = jwt.sign({id : user._id}, secretToken, {expiresIn : "1h"})

    res.cookie("accessToken", token, {httpOnly : true}).status(200).send({ success: true, message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    res.status(400).send({success: false, message: "login failed"})
    console.log(error)
    return;
  }
} 

export const logoutUser : RequestHandler = async (req, res) => {
  try {
    res.clearCookie("accessToken").status(200).send({success: true, message: "User logged out"})
    return;
  } catch (error) {
    res.status(400).send({success: false, message: "Logout failed"})
    console.log(error)
    return;
  }
}

export const requestResetPassword : RequestHandler = async (req, res) => {

  const {email, phoneNo} = req.body
 
  const user = await User.findOne({ $or : [{email},{phoneNo}]})

  if (!user) {
    res.status(400).send({ success: false, message: "User not found" });
    return;
  }

  try {

    const secret = process.env.JWT_TOKEN + user.password

    const token = jwt.sign({id: user._id, email: user.email}, secret, {expiresIn: '1h'});

    const url = `https://food-orderng.vercel.app/resetpassword?id=${user._id}&token=${token}`;

    //console.log(token)


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `link to reset your password. Click on it, and you will directed to where you have to change your password ${url}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({success: true, message: "Reset Password email sent successfully"})

    
  } catch (error) {
    res.status(400).send({success: false, message: "Error in sending link"})
    console.log(error)
  }
}

export const resetPassword : RequestHandler = async (req, res) => {

  const { id, token } = req.query;

  console.log(`user id ${id}`)
  const { password, confirmPassword } = req.body;

  if (!id || typeof token !== "string") {
    res.status(400).json({ success: false, message: "Missing or invalid user ID or token" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: "Passwords do not match" });
    return;
  }

  try {
    const user = await User.findById(id);
    console.log(user)
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
  
    const secret = ( process.env.JWT_TOKEN || "" ) + user.password;

    try {
      jwt.verify(token, secret); // Verify the token with the same secret used during creation
    } catch (err) {
      res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Token is valid; proceed with password reset
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ success: true, message: "Password has been reset successfully" });

  } catch (error) {
    res.status(400).send({success: false, message: "Error in resetting password"})
    console.log(error)
  }
} 