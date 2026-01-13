import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signup = async (req , res)=>{
    console.log("req is coming");
   try{
      let {username , email , password} = req.body;
      if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
      }

      let existingUser = await User.findOne({email});
      
      if(existingUser){
        return res.status(400).json({ message: "user already exist" });
      }
       const hashedPassword = await bcrypt.hash(password , 10);
       const user = new User({
        username : username,
        email : email,
        password : hashedPassword,
      });

    await user.save();

        let token = createSecretToken(user._id);
        console.log(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,      // only HTTPS
            sameSite: 'none',  // if frontend is on a different domain
            maxAge: 1000 * 60 * 60 * 24, // optional: 1 day
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user });

        }
    catch(e){
        console.log(e);
        res.status(500).json({ message: "Server error", error });
    }


}


export const login =  async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       httpOnly: true,
      secure: true,      // only HTTPS
      sameSite: 'none',  // if frontend is on a different domain
      maxAge: 1000 * 60 * 60 * 24, // optional: 1 day
     });
     res.status(201).json({ message: "User logged in successfully", success: true , user});
     
  } catch (error) {
    console.error(error);
  }
}

export const userVerification = (req, res) => {
  const token = req.cookies.token
  
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user })
      else return res.json({ status: false })
    }
  })
}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    status: true,
    message: "Logged out successfully",
  });
};