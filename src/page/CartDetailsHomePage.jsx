import { Link } from "react-router-dom"
import {Image,Box,Text,Flex} from "@chakra-ui/react"
import { imagePath } from "../services/path"
import { StarIcon } from '@chakra-ui/icons'



const CartDitails =({item ,type})=>{
    return (
        <Link to={type}  >
            <Box position={"relative"} transform={'scale(1)'}  _hover={{
                transform :{base:'scale(1)',md:'scale(1.08)'},
                transition : 'transform 0.2s easy-in-out',
                zIndex:10,
                '& .overlay' :{
                    opacity: 1,
                }
            }} >
            <Image   src={`${imagePath}/${item.poster_path}`} alt={item?.title || item?.name} height={'100%'} />      
           
            <Box 
            className="overlay"
             position={"absolute"} p={'2'} bottom={'0'}
             left={'0'} h={'33%'} w={'100%'} bg='rgba(0,0,0,0.8)'
              opacity={'0'}
              transform={'opacity 0.3 ease-in-out '}
              >
            <Text  textAlign={'center'} noOfLines={'1'}  > {item?.title || item?.name} </Text>
            <Text  textAlign={'center'}> { item?.release_date|| item?.first_air_date } </Text>
            <Flex alignItems={'center'} justifyContent={'center'} gap={'2'} >
                <StarIcon/>
                <Text>{item?.vote_average?.toFixed(1)}</Text>
            </Flex>
            </Box>

            </Box>

           
        </Link>
    )
}
export default CartDitails