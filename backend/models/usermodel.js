const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')
const Schema=mongoose.Schema
const userSchema=new Schema({
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  }
})

//for signup
userSchema.statics.signup=async function(email,password){
  if(!email || !password){
    throw Error('all fields must be filled')
  }
  if(!validator.isEmail(email)){
    throw Error('enter a valid email adress')
  }
  if(!validator.isStrongPassword(password)){
    throw Error('password is not strong enough')
  }
  const exists=await this.findOne({email})
  if(exists){
    throw Error('Email already in use')
  }
  const salt=await bcrypt.genSalt(10) //this adds the randomly generated string to pass
  const hash=await bcrypt.hash(password,salt)
  const user=await this.create({email,password:hash})
  return user
}

//for login
userSchema.statics.login=async function(email,password){
  if(!email || !password){
    throw Error('all fields must be filled')
  }
  const user=await this.findOne({email})
  if(!user){
    throw Error('user not found')
  }
  const match=await bcrypt.compare(password,user.password)
  if(!match){
    throw Error('incorrect password')
  }
  return user
}



module.exports=mongoose.model('User',userSchema)