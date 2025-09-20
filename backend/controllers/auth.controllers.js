import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";


//signup controller
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at leaste 6 character" });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile Number must be at leaste 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`Sign up error ${error}`);
  }
};



// sign in controller 

export const signIn = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not  exist" });
    }
    
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({ message: "Incorrect password" });
    }

    

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`Sign in error ${error}`);
  }
};

//sign out controller

export const signOut=async (req,res)=>{
  try{
    res.clearCookie("token")

  return res.status(200).json({message:"Log out successfully"})  

  }
  catch(error){
    return res.status(500).json(`Sign out error ${error}`);


  }
}