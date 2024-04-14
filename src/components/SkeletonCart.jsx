import { Skeleton ,Grid } from '@chakra-ui/react'


const SkeletonCart =()=>{
    return(
        <Grid  >


             <Skeleton  h='300px' > 
  <div>contents wrapped</div>
  <div>won't be visible</div>
</Skeleton>
        </Grid>
       
    )
}

export default SkeletonCart