    import { collection, addDoc, doc, setDoc, getDoc, deleteDoc, getDocs } from "firebase/firestore"; 
import { db } from "./firebase";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";




export const useFirestore =()=>{
 const toast =useToast();


    const addToWatchlist = async(userId ,dataId ,data)=>{
        if (await checkIfInWatchlist(userId ,dataId)){
            toast({
               
                description:"this item is already in our watchlist",
                status:'error',
                isClosable:true,
                duration: 2000
              })
              return false
        }
        try {
            await setDoc(doc(db, "users", userId, "watchlist" , dataId), data);
            toast({
                title:"added to weatchlist ",
                status:'success',
                isClosable:true,
                duration: 2000
              })

        } catch (error) {
            console.log(error)
            toast({
                title:"Error ",
                description:"An error occurred",
                status:'error',
                isClosable:true,
                duration: 2000
              })
        }
    }
    const checkIfInWatchlist =async  (userId, dataId)=>{
        const docRef = doc(db , 'users' , userId?.toString(), 'watchlist' ,dataId?.toString())
        const docSnap = await getDoc(docRef)
      
        if(docSnap.exists()){
          return true
        }else{
          return false
        }
      }

      const removeWatchlist =async (userId, dataId)=>{
        try {
            await deleteDoc(doc(db , 'users',userId?.toString(), 'watchlist' ,dataId?.toString() ))
            toast({
                title:"remove from watchlist ",
                status:'success',
                isClosable:true,
                duration: 2000
              })
        } catch (error) {
            toast({
                title:"Error ",
                description:"An error occurred",
                status:'error',
                isClosable:true,
                duration: 2000
              })
        }
      }
      const getWatchlist =  useCallback( async(userId)=>{
        const querySnapshot = await getDocs(collection(db, "users",userId,"watchlist"));
            const data = querySnapshot.docs.map((doc)=>({
                ...doc.data()
            }))
            return data 
      },[])

    return{
        checkIfInWatchlist,
        addToWatchlist,
        removeWatchlist,
        getWatchlist,
    }

}


