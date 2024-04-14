import { useState } from "react"
import { useCustomQuery } from "../services/api"
import {Grid,Container,Heading,Flex ,Box,Input,Spinner,Text} from "@chakra-ui/react"
import { bsaeUrl, key } from "../services/path"
import CartDitails from "./CartDetailsHomePage"
import Paganation from "../components/Paganation"


const SearchPage =()=>{
    const [pages ,setPages]=useState(1)
    const [searchValue ,setSearchValue] = useState('')
   
    const {data,isLoading} =useCustomQuery({queryKey:['search',searchValue,pages] , 
    url :`${bsaeUrl}/search/multi?api_key=${key}&query=${searchValue}
    &page=${pages}`})
    
     const submitsearch =(e)=>{
        e.preventDefault();
       data?.results

        console.log(data?.results)
     }


    return(
        <Container maxW={"container.1x"}>
            <Flex alignItems={"baseline"}  gap={'4'} my={'5'}>
            <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'} >
            search
            </Heading>
            </Flex>
            <form onSubmit={submitsearch} >
              <Input placeholder="search..." value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
              _placeholder={{color : "gray.100"}}
              />
            </form>
                {isLoading&&(
                    <Flex justifyContent={'center'} mt={'10'}>
                        <Spinner size={'xl'} color="red" />
                    </Flex>
                )}



                 {data?.results?.length === 0 && !isLoading && (
                    <Heading as={'h2'} textAlign={'center'}  fontSize={"lg"} mt={'10'} color={'gray.100'} >No Result Found </Heading>
                 )}
                      
                      <Grid templateColumns={
                {base : '1fr',sm:'repeat(3,1fr)', md:'reprat(4 ,1fr)'   ,lg:'repeat(5 , 1fr)'}
            } gap={'4'}>
           {data?.results?.length > 0&&!isLoading   &&data?.results?.map((item)=>(
            <CartDitails key={item.id}  item={item} type={`/${item?.media_type}/${item?.id}`} />
           
           ))}
            </Grid>
                  {data?.results?.length >0 && !isLoading &&(
                               <Paganation activPage={data?.page}  totalPage={data?.total_pages} setPages={setPages} pages={pages} /> 

                  )}

            </Container>
    )
}
export default   SearchPage