import { useCustomQuery } from "../services/api"
import { bsaeUrl, key } from "../services/path"
import {Grid,Container,Heading,Flex ,Box,Select} from "@chakra-ui/react"
import CartDitails from "./CartDetailsHomePage"
import { useState } from "react"
import SkeletonCart from "../components/SkeletonCart"
import Paganation from "../components/Paganation"



const MoviesPage =()=>{
    const [pages ,setPages] = useState(1)


    const [sortBy ,setSortBy] =useState("popularity.desc")
  
    const {data,isLoading} =useCustomQuery({queryKey:['movies',pages,sortBy] , url :`${bsaeUrl}/discover/movie?api_key=${key}
    &page=${pages}&sort_by=${sortBy}`})


    if(isLoading){
        return(
            <Grid templateColumns={{base : '1fr',sm:'repeat(3,1fr)', md:'reprat(4 ,1fr)'   ,lg:'repeat(5 , 1fr)'}} gap={'4'} ml={'6'}>
             {Array.from({length:20},(_,idx)=>(
            <SkeletonCart key={idx} />
        ))}
        </Grid>    
        )
        
    }
    return(
        <Container maxW={"container.1x"}>
            <Flex alignItems={"baseline"}  gap={'4'} my={'5'}>
            <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'} >
            discover movies
            </Heading>
            <Select w={'130px'} color={"gray.500"} 
            onChange={e=>{
                
               setSortBy(e.target.value)
               setPages(1)
               console.log(e.target.value)
            }}
            >  
                <option   color={'black'} value="popularity.desc">Popular</option >
                <option   color={'black'} value="vote_avarage.desc&&vote_count.vote=1000">Top Rated</option >
            </Select>
            
            
            </Flex>
           
            <Grid templateColumns={
                {base : '1fr',sm:'repeat(3,1fr)', md:'reprat(4 ,1fr)'   ,lg:'repeat(5 , 1fr)'}
            } gap={'2'}>
           {
           
           data&&data.results.map((item)=>(
            <CartDitails key={item?.id}  item={item} type={`/movie/${item?.id}`} />
           
           ))}
            </Grid>
            {/*paganation */}
             <Paganation activPage={data?.page}  totalPage={data?.total_pages} setPages={setPages} pages={pages} />
        </Container>
    )
}
export default   MoviesPage