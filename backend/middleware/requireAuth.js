//    we are taking token from brower to here by authorization prop which will be sent front frontend after taking the token 
//     we check two condition wheather token is present or not (if condition in below code does it) and other one is that token is valid or not by(jwt.verify)
// jwt.verify resturns payload and since payload is formed by id of user we are grabbing it after grabbing we are taking user details from usermodel using _id

const jwt=require('jsonwebtoken')
const User=require('../models/usermodel')
const requireAuth=async (req,res,next)=>{
  const {authorization}=req.headers
  if(!authorization){
    return res.status(401).json({error :'Authorization is required'})
  }
  const token=authorization.split(' ')[1]
  try{
    const {_id}=jwt.verify(token,process.env.SECRET)
    req.user=await User.findOne({_id}).select('_id')
    next()
  }catch(error){
    res.status(401).json({error:'Request is not authorized'})
  }
}
module.exports=requireAuth