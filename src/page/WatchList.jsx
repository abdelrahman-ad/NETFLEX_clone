import { useState } from "react"
import { useAuth } from "../context/authProvider"
import { useFirestore } from "../services/firestore"
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import WatchListCard from "../components/WatchListCard"
import CartDitails from "./CartDetailsHomePage"

const WatchList =()=>{
    const {getWatchlist}=useFirestore()
    const {user}= useAuth()
    const[ watchlist ,setWatchlist] =useState([])
    const[ isLoading ,setIsLoaing] =useState()
     
    useEffect(()=>{
    
        if(user?.uid){
            getWatchlist(user?.uid).then(( data)=>{
                setWatchlist(data)
                console.log(data)
        }).catch((error)=>{
          console.log(error)
        }).finally(()=>{
            setIsLoaing(false)
        } )
        }
    },[user?.id , getWatchlist  ])
    
    return(
        <Container maxW={"container.1x"}>
        <Flex alignItems={"baseline"}  gap={'4'} my={'5'}>
        <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'} >
        TRENDING
        </Heading>
        </Flex>
        {isLoading &&
        <Flex justify={'center'} mt={'10'} >
            <Spinner color="red" fontSize={'xl'} />
        </Flex>
        }
          {!isLoading && watchlist?.length ===0 &&
        <Flex justify={'center'} mt={'10'} >
            <Heading  fontSize={'xl'}  color={"gray.400"} > No item in watchlist  </Heading>
        </Flex>
        }

        {!isLoading && watchlist?.length > 0 &&
        <Grid templateColumns={{base : "1fr"}} gap={"4"}>
            {watchlist.map((item) =>(
                 <WatchListCard key={item?.id} item={item}  type={item?.type} setWatchlist={setWatchlist} />
            ))}

        </Grid>
        }

          

        </Container>
    )
}

export default WatchList