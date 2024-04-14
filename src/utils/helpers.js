export const hourfun =(minutes)=>{
    const hour =Math.floor(minutes/60)
    const mins =minutes % 60
return `${hour}h ${mins}m `
}


export const ratingToPercentage =(rating)=>{
 return (rating *10)?.toFixed(0)
}