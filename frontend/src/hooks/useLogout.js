import {useAuthContext} from './useAuthContext'

export const useLogout=()=>{
  const {dispatch}=useAuthContext()
  const logout=()=>{
    // removing token and user details from local storage
    localStorage.removeItem('user')

    //removing user from global variable where we store details of user
    dispatch({type: 'LOGOUT'})
  }
  return {logout}
}