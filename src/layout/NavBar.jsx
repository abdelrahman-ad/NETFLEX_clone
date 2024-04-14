import {  useDisclosure,Avatar, Box,Container,Drawer,DrawerBody,DrawerContent,DrawerHeader,Flex,
  IconButton, Menu, MenuButton, MenuItem, MenuList,
  DrawerOverlay,
  DrawerCloseButton,
  Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authProvider"
import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";

const NavBar =()=>{
     const {user ,sinInGoogle,logOut}=useAuth();
  
     const { onOpen, isOpen, onClose } = useDisclosure();
   
     
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
              {/* DESCTOP */}
              <Flex  gap={4} alignItems={'center'} display={{base :'none' , md: "flex"}} >
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
              {/* Mobile */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar bg="red.500" size={"sm"} name={user?.email} />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.800"
                      as="button"
                      onClick={handlerLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Watchlist</Link>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          onClick={logOut}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
             </Flex>
            </Container>
        </Box>
    )
}
export default NavBar