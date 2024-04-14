import { useState } from "react"
import {  useCustomQuery } from "../services/api"
import {Grid,Container,Heading,Flex ,Box} from "@chakra-ui/react"
import CartDitails from "./CartDetailsHomePage"
import { bsaeUrl, key } from "../services/path"
import SkeletonCart from "../components/SkeletonCart"


const HomePage =()=>{
    const [timeWindows,setTimeWindows]=useState('day')
   
   const  timeWindow= timeWindows
  



const {data,isLoading}= useCustomQuery({queryKey:['videos',timeWindow] , url :`${bsaeUrl}/trending/all/${timeWindow}?api_key=${key}`})



//skeleton
if(isLoading){
    return(
        <Grid templateColumns={{base : '1fr',sm:'repeat(3,1fr)', md:'reprat(4 ,1fr)'   ,lg:'repeat(5 , 1fr)'}} gap={'4'} ml={'6'}>
         {Array.from({length:20},(_,idx)=>(
        <SkeletonCart key={idx} />
    ))}
    </Grid>    
    )
    
}

    return (
        <Container maxW={"container.1x"}>
            <Flex alignItems={"baseline"}  gap={'4'} my={'5'}>
            <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'} >
            TRENDING
            </Heading>
            <Flex alignItems={'center'} gap={'4'} border={'1px solid teal'} borderRadius={'20px'}>
            <Box as='button' px={'3'}  py={'1'} borderradiuse={'20px'} onClick={()=>setTimeWindows('day')} 
             color={`${timeWindow === "day" ? "" :"rgb(138, 153, 153)"}`} >
                Today</Box>
            <Box as='button' px={'3'}  py={'1'} color={`${timeWindow === "week" ? "" :"rgb(138, 153, 153)"}`} borderradiuse={'20px'}  onClick={()=>setTimeWindows('week')}>
              This week
              </Box>
            </Flex>
           
            </Flex>
           
            <Grid templateColumns={
                {base : '1fr',sm:'repeat(3,1fr)', md:'reprat(4 ,1fr)'   ,lg:'repeat(5 , 1fr)'}
            } gap={'2'}>
           {data&&data.results.map((item)=>(
            <CartDitails key={item.id}  item={item} type={`/${item?.media_type}/${item?.id}`} />
           
           ))}
            </Grid>
        </Container>
    )
}

export default HomePage