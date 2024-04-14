import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { useFirestore } from "../services/firestore"
import { Box, Flex, Heading, IconButton, Image, Text, Tooltip } from "@chakra-ui/react"
import { imagePath } from "../services/path"
import { CheckIcon, StarIcon } from "@chakra-ui/icons"

const WatchListCard =({type ,item ,setWatchlist })=>{
   const {removeWatchlist}=useFirestore()
   const {user}=useAuth()
   const handelRemove =(e)=>{
    e.preventDefault()
    removeWatchlist(user?.uid , item.id ).then(()=>{
        setWatchlist((prev)=>prev.filter((el)=>el.id !==item.id))
    })
   }


    return(
          <Link to={`/${type}/${item.id}`}>
            <Flex gap={'4'}>
                <Box position={'relative'} w={'150px'}>
                    <Image  src={`${imagePath}/${item.poster_path}`} alt={item?.title}  h={'200px'} minW={'150px'} 
                    objectFit={'cover'}
                    />

                    <Tooltip label='remove from watchlist'>
                        <IconButton 
                        aria-label="remove from watchlist"
                        bg={'gray.500'}
                        icon={<CheckIcon/>}
                        size={'sm'}
                        position={"absolute"}
                        zIndex={"999"}
                        top={"2px"}
                        left={"2px"}
                        onClick={handelRemove}
                        />
                    </Tooltip>
                </Box>
                <Box>
                    <Heading  fontSize={{base:"xl" ,md:'2xl'}} noOfLines={1}>
                        {item?.title || item?.name}
                    </Heading>
                    <Heading fontSize={"sm"} color={"green.200"} mt={'2'}>
                        {new Date(item?.release_date || item?.first_air_date).getFullYear() ||"N/A"}
                    </Heading>
                    <Flex alignItems={'center'} gap={'2'} mt={'4'}>
                        <StarIcon fontSize={'small'}/>
                        <Text textAlign={'center'} fontSize={'small'}>
                            {item?.vote_average?.toFixed(1)}
                        </Text>
                    </Flex>
                    <Text mt={"4"}  fontSize={{base:"xs" ,md:"sm"}}  noOfLines={5} >
                        {item?.overview}
                    </Text>
                </Box>
            </Flex>
          </Link>
    )
}

export default WatchListCard