import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const ProdectedRoute =({children}) =>{
   const {user ,isLoading}= useAuth()
   if(isLoading){
    return null
   }
    return(
            <>
             {user ? children : <Navigate to={'/'} />}
            </>
    )
}

export default ProdectedRoute