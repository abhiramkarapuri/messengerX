import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
export const signup = async (req,res)=>{
  const {fullName,email,password} = req.body;

  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"});
    }
    if(password.length < 6){
      return res.status(400).json({message:"Password must be atleast 6 characters"});
    }

    //check if email is valid: use regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return res.status(400).json({message:"Invalid email format"});


    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message:"Email already exists"});
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
      fullName,
      email,
      password:hashedPassword
    })

      //persist user first and then generate token
      generateToken(newUser._id,res);

      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
      });

      try{
        await sendWelcomeEmail(newUser.email,newUser.fullName,ENV.CLIENT_URL);
      } catch (error) {
        console.log("Error sending welcome email:",error);
      }
    

  } catch (error) {
    console.log("error in signup controller",error);
    res.status(500).json({message:"Internal Server error"});
  }
}