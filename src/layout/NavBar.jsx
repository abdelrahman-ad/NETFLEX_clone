import {Avatar, Box,Container,Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { Search2Icon } from "@chakra-ui/icons";

const NavBar =()=>{
     const {user,isLoading ,sinInGoogle,logOut}=useAuth();
    
     const handlerLogin = async () =>{
      try {
         await sinInGoogle();
         console.log("success")
      } catch (error) {
        console.log(error)
      }
     }

    return (
        <Box py="4" mb='2'>
            <Container maxWidth={"cotainer.1xl"} >
             <Flex justifyContent={'space-between'}>
              <Link to="/">
                <Box  fontSize={"2xl"} fontWeight={"bold"} color={"red"} letterSpacing={"widest"} fontFamily={"mono"} >
                    NETFLEX
                </Box>
              </Link>
              <Flex  gap={4}>
                <Link to="/" > Home</Link>
                <Link to="/movies" > Movies</Link>
                <Link to="/shows" > TV Shows</Link>
                <Link to="/search" > <Search2Icon color={'red'} fontSize={'xl'} /> </Link>
                {user&&(
                    <Menu   >
                      <MenuButton >
                        <Avatar name={user?.email}  size={'sm'}/>
                      </MenuButton>
                      <MenuList   >         
                        <Link to={'/watchlist'}   >
                          <MenuItem color={'gray.800'}  >watchlist</MenuItem>
                        </Link>
                        <MenuItem   color={'gray.800'} onClick={logOut}>logout</MenuItem>
                      </MenuList>
                    </Menu>
               ) }
                {!user &&
                ( <Avatar size={'sm'}  bg={'gray.800'} as='button' onClick={handlerLogin} />)
                }
              </Flex>
             </Flex>
            </Container>
        </Box>
    )
}
export default NavBar