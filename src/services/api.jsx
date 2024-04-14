import  axios  from "axios"
import {
    useQuery,
  } from '@tanstack/react-query'


const bsaeUrl ="https://api.themoviedb.org/3"
const key = import.meta.env.VIDEO_API_KEY



export  const  useCustomQuery = ({url,queryKey})=>{
    return useQuery({
        queryKey,
        queryFn :async ()=>{
        const {data}=  await axios.get(url ,{
            headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2QzMmM4ZGZiZGZlZGE3N2Y1MTQ4Nzk3ZWZlZjc0MyIsInN1YiI6IjY2MTJiNmM3MTk2OTBjMDE2M2E0MDMyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pj-Q5-1wFNL_m7NroKJ7xayU2KTs8oKZdxtzSrEF4fc'
                         }
        })
      return data  
      }
     } )
}