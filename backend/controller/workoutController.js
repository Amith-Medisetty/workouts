const Workoutmodel = require('../models/Workoutmodel')
const mongoose=require('mongoose')


//get all workouts
const getWorkouts=async(req,res)=>{
  const user_id=req.user._id
  const workouts=await Workoutmodel.find({user_id}).sort({createdAt: -1})
  res.status(200).json(workouts)
}



//get single workout
const getWorkout=async(req,res)=>{
  const {id}= req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Invalid id"})
  }
  const workout=await Workoutmodel.findById(id)

  if(! workout){
    return res.status(404).json({error: "No such workout"})
  }
  res.status(200).json(workout)
}



//create a new workput
const createWorkout =async(req,res)=>{

  const{title,reps,load}=req.body     //defining body of doc through req

  //  creating an workout in database through required schema of an workout through Workoutmodel file
  try{
    const user_id=req.user._id
    const workout=await Workoutmodel.create({title,reps,load,user_id})
    res.status(200).json(workout)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}



//delete a workout
const deleteWorkout=async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "invalid id"})
  }
  const workout=await Workoutmodel.findOneAndDelete({_id: id})
  if(!workout){
    return res.status(400).json({error :"Workout does not exits"})
  }
  res.status(200).json(workout)
}

//update a workout
const updateworkout=async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "invalid id"})
  }
  const workout=await Workoutmodel.findOneAndUpdate({_id: id},{
    ...req.body
  })
}



module.exports={
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateworkout
}