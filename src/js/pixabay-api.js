import axios from "axios";


const keyApi="55724103-14f076f0e5cd96e081e15651b"
const urlApi="https://pixabay.com/api/"

export async function getImagesByQuery(query,page){
   const {data} = await axios(urlApi, {params:{
        per_page:15,
        page ,
        key:keyApi,
        q:query,
        image_type:"photo",
        orientation:"horizontal",
        safesearch:true
    }})
    return data;


}