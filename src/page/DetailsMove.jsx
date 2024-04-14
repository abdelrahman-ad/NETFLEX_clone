import {Grid,Container,Heading,Flex ,Box,Spinner,Image,Text,CircularProgress,CircularProgressLabel,Button,Badge, useToast,
} from "@chakra-ui/react"
import { CalendarIcon,CheckCircleIcon ,SmallAddIcon,TimeIcon} from '@chakra-ui/icons'

import {useParams} from "react-router-dom"
import { useCustomQuery } from "../services/api"
import { bsaeUrl, imagePath, imagePathOrigenal, key } from "../services/path"
import { hourfun, ratingToPercentage } from "../utils/helpers"
import { ColorCircle } from "../utils/ColorCircle"
import VideoComponent from "../components/VideoComponent"
import { useAuth } from "../context/authProvider"
import { useFirestore } from "../services/firestore"
import { useEffect, useState } from "react"

const DetailsMove =()=>{
  //state
   const [isInWatchlist, setIsInWatchlist ] =useState(false)
  //
  const {addToWatchlist,checkIfInWatchlist,removeWatchlist}=useFirestore()
  const {user }= useAuth()
   const toast =useToast();
    const typeId =useParams()
    const {id ,type}=typeId
// api page ,cast,videos
   const {data,isLoading} =useCustomQuery({queryKey:['cart',id] , url :`${bsaeUrl}/${type}/${id}?api_key=${key}`})
   const { data : casts } =useCustomQuery({queryKey:['cast' ,id] , url :`${bsaeUrl}/${type}/${id}/credits?api_key=${key}`})
   const {data : videos} =useCustomQuery({queryKey:['videos' ,id] , url :`${bsaeUrl}/${type}/${id}/videos?api_key=${key}`})
// cast and video        
const castSlice =casts?.cast.slice(0,7)
const cartVideos = videos?.results?.find((video) => video.type ==="Trailer")
const allVideos = videos?.results?.filter((video) => video.type !=="Trailer").slice(0,10)

//handelSaveWatchlist

const handelSaveWatchlist =()=>{
  if(!user){
    toast({
      title:"Login to add to watchlis",
      status:'error',
      isClosable:true,
    })
    return;
  }

  const userData = {
    id: data?.id,
    title : data?.title || data?.name,
    type : type,
    poster_path :data?.poster_path,
    release_date :data?.release_date || data?.first_air_date ,
    vote_average :data?.vote_average,
    overview :data?.overview

  }
  const dataId =userData?.id.toString()

  addToWatchlist(user?.uid , dataId , userData  )
 const checkButton   =  checkIfInWatchlist(user?.uid ,dataId)
 setIsInWatchlist(checkButton)
}

//useEffect Button checked
useEffect(()=> {
  if(!user){
   setIsInWatchlist(false)
   return
  }
  checkIfInWatchlist(user?.uid , id).then((data) => {
        setIsInWatchlist(data)
  })
 },[id ,user ,checkIfInWatchlist])

 // handelRemoveFromWatchlist

 const handelRemoveFromWatchlist = async()=>{
  await removeWatchlist(user?.uid , id)
  const checkButton   = await checkIfInWatchlist(user?.uid ,id)
 setIsInWatchlist(checkButton)
  
 }

if(isLoading){
    return(
        <Flex justify={'center'} >
            <Spinner size={'xl'} color="red" />
        </Flex>
    )
}
const title =data?.title || data?.name
const  realdate =data?.release_date|| data?.first_air_date
    return(
        <Box>
          <Box background={`linear-gradient(rgba(0,0,0,.88),rgba(0,0,0,.88)),url(${imagePathOrigenal}/${data?.backdrop_path})`}
          backgroundRepeat={'no-repeat'} backgroundSize={'cover'}  backgroundPosition={'center'}
          w={'100%'} h={{base :'auto' , md:'500px'}} py={'2'} zIndex={'-1'} display={'flex'} alignItems={'center'}
          >
            <Container maxW={'container.xl'}>
                <Flex alignItems={'center'} gap={'10'} flexDirection={{base:'column' , md:'row'}} >
                    <Image height={'450px'} borderRadius={'sm'} src= {`${imagePath}/${data?.poster_path}`} />
                    <Box>
                          <Heading fontSize={'lg'} >{title} {" "}
                          <Text as='span' fontWeight={'normal'} color={"gray.400"}>
                          {new Date(realdate).getFullYear()}
                          </Text>
                          </Heading>

                          <Flex alignItems={'center'} gap={'6'} mt={1} mb={5}>
                            <Flex alignItems={'center'}>
                               <CalendarIcon mr={2} color={'gray.400'} />
                                 <Text>
                                    {new Date(realdate).toLocaleDateString('en-US')} (US)
                                 </Text>
                             </Flex>
                             {type === 'movie'&& (
                                <>
                                <Box>*</Box>
                                <Flex alignItems={'center'} color={'gray.400'} >
                                    <TimeIcon mr={'2'} />
                                    <Text> {hourfun(data?.runtime)} </Text>
                                </Flex>
                                </>
                             )}
                            </Flex>

                        <Flex alignItems={'center'} gap={'4'}>
                            <CircularProgress 
                            value={ratingToPercentage(   data?.vote_average)}  borderRadius={'full'} 
                            p={'0.5'} size={"70px"} color={ColorCircle( data?.vote_average)} thickness={'6px'}
                            >
                                <CircularProgressLabel fontSize={"lg"}>
                                      {/* foucse her //TODO */}
                                    {ratingToPercentage(   data?.vote_average)}{""}    
                                    <Box as={'span'}  fontSize={'sm'}> %</Box>
                                </CircularProgressLabel>
                            </CircularProgress>

                            
                            <Text display={{base:'none' , md:"initial"}}>User Score</Text>
                             
                             {isInWatchlist ? (
                                <Button leftIcon={<CheckCircleIcon />} colorScheme="green" variant={'outline'} 
                             _hover={{backgroundColor:"rgba(0,0,0,.8)" }}
                              onClick={handelRemoveFromWatchlist} >
                                In WatchList  </Button>
                             ) : (
                                <Button leftIcon={<SmallAddIcon />}  variant={'outline'} color={"gray.400"}
                                  _hover={{backgroundColor:"rgba(0,0,0,.1)" , color:"white"}}
                              onClick={handelSaveWatchlist} >
                                Add to WatchList  </Button>
                             )}
                           


                               

                           </Flex>  
                         <Text color={'gray.400'}  fontSize={'sm'} fontStyle={'italic'} my={'5'}>
                                        {data?.tagline}
                          </Text> 

                          <Heading fontSize={'lg'} mb={'3'} >Overview </Heading>
                          <Text fontSize={'md'} mb={'3'} >{data?.overview} </Text>

                          <Flex mt={'6'} gap={'2'} >
                            {data?.genres.map((genre,idx)=>
                           <Badge bg={'gray.500'} key={idx} >{genre.name}</Badge>
                        )}
                          </Flex>                                                          
                    </Box>                  
                </Flex>         
            </Container>
          </Box>
         <Container maxW={'Container.xl'} pb={'10'} >
           <Heading as='h2' fontSize={"md"} textTransform={'uppercase'} mt={'10'} mb={'5'} >
            Cast
           </Heading>
           <Flex overflowX={'scroll'} >
            {castSlice?.length ===0 &&<Text>No cast found </Text>}
            {castSlice &&castSlice.map((item )=>
            <Box>
                 <Image maxW={'150px'} key={item.id} src={`${imagePath}/${item?.profile_path}`} />
            </Box>
              )}
           </Flex>
           <Heading as={'h2'} fontSize={'md'} textTransform={"uppercase"} mt={'10'} mb={'5'} >
            videos
           </Heading>
           <VideoComponent id={cartVideos?.key}/> 
           <Flex mt={"5"} mb={'10'} overflowX={"scroll"} gap={'5'} >  
           {allVideos&&allVideos.map((item) =>
        <Box key={item.id} minW={'290px'} >
                      <VideoComponent id={item?.key}  small />
                      <Text fontSize={'sm'} fontWeight={'bold'} mt={'2'} noOfLines={'2'}>{item?.name} </Text>
                     
  
        </Box>
        )}
             </Flex>


         </Container>



        </Box>
    )
}

export default DetailsMove