const User=require('../models/usermodel')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'}) //in creating token 1st arg is payload data(non sensitive data only like username not pass) and 2nd arg is secrete code for signature
}
const loginuser=async(req,res)=>{
  const {email,password}=req.body
  try{
    const user=await User.login(email,password)
    const token=createToken(user._id)
    res.status(200).json({email,token})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}
const signupuser=async(req,res)=>{
  const {email,password}=req.body
  try{
    const user=await User.signup(email,password)

    //creating a token
    const token=createToken(user._id)

    res.status(200).json({email,token}) 
  }catch(error){
    res.status(400).json({error: error.message})
  }
}
module.exports={loginuser,signupuser}