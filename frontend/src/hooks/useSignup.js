import { useState } from "react";
import {useAuthContext} from './useAuthContext'
export const useSignup=()=>{
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(null)
  const {dispatch}=useAuthContext()
  const signup=async(email,password)=>{
    setIsLoading(true)
    setError(null)
    const response=await fetch('/api/user/signup',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    })
    const json=await response.json()
    if(!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if(response.ok){
      // as response is ok and data fetching is done loading should be stopped
      setIsLoading(false)

      //storing the user in our localstorage beacuase as when he again comes we should directly make him login 
      localStorage.setItem('user',JSON.stringify(json))

      // storing them in global variable as it should be accessed by all
      dispatch({type:'LOGIN',payload : json})
    }
  }
  return {signup,isLoading,error}
}