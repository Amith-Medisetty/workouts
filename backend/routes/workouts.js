const express=require('express')
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateworkout
}=require('../controller/workoutController')
const requireAuth=require('../middleware/requireAuth')
const router=express.Router()

router.use(requireAuth)

// GET all workouts
router.get('/',getWorkouts)

//GET single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/',createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATING a workout
router.patch('/:id',updateworkout)


module.exports=router