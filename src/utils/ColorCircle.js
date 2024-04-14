
export const ColorCircle =(rating)=>{

        if (rating >=7) {
            return"green.400"
        }else if(rating >=5){
             return"orange.400"
        }else{
            return'red.400'
        }
    
}