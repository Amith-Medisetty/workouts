// importing express frame work
require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')

// express app
const app=express()
const workoutroutes=require('./routes/workouts')
const userroutes=require('./routes/user')


//middleware
app.use(express.json()) //while adding new workouts to database through post and patch routes we need express.json


app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})


app.use('/api/workouts',workoutroutes)
app.use('/api/user',userroutes)


//connecting to database
mongoose.connect(process.env.MONG_URI)
 .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('conected to db and listening on port 4000')
    })
 })
 .catch((error)=>{
  console.log(error)
 })


// what to render on the page localhost:4000
// app.get('/',(req,res)=>{
//   res.json({mssg:'welcome to the app'})
// })



