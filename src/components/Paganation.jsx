import {Text,Button,Heading,Flex ,Box} from "@chakra-ui/react"


const Paganation=({activPage,totalPage,setPages ,pages})=>{
    return(
<Flex gap={'2'} alignItems={'center'} >
  <Flex gap={'2'} maxW={'250px'} my={'18'} >
     <Button  isDisabled={pages === 1  }  onClick={() => setPages( pages - 1) } >Prev</Button>
     <Button isDisabled={pages === totalPage} onClick={() => setPages( pages + 1 )} > Next</Button>
  </Flex  >
  <Flex gap={'1'}> 
     <Text>{activPage}</Text>
     <Text>of</Text>
     <Text>{totalPage}</Text>
  </Flex>
</Flex>
    )
}

export default Paganation