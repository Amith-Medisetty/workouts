import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{
  const [isLoading,setIsloading]=useState(null)
  const [error,setError]=useState(null)
  const {dispatch}=useAuthContext()
  const login=async(email,password)=>{
    setIsloading(true)
    setError(null)
    const response=await fetch('/api/user/login',{
      method:'POST',
      headers :{'Content-Type':'application/json'},
      body: JSON.stringify({email,password})
    })
    const json=await response.json()
    if(!response.ok){
      setIsloading(false)
      setError(json.error)
    }
    if(response.ok){
      setIsloading(false)
      localStorage.setItem('user',JSON.stringify(json))
      dispatch({type:'LOGIN',payload:json})
    }

  }
  return {login,isLoading,error}
}