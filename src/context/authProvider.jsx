import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup  ,signOut} from "firebase/auth";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../services/firebase";


export const AuthContext=createContext();

export const AuthProvider = ({children})=>{
  const [user , setUser]=useState(null)
  const [isLoading , setIsLoadong]=useState(true)

  function sinInGoogle (){
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function logOut (){
    return signOut(auth)
  }

  useEffect(()=>{
   onAuthStateChanged(auth ,(currentUser) =>{
    if(currentUser){
        setUser(currentUser)
    }else{
        setUser(null)
    }
    setIsLoadong(false)
   })
  },[])
return <AuthContext.Provider  value={{user,isLoading ,sinInGoogle,logOut}} >
    {children}
</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)