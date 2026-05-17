import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton, loadMore } from "./js/render-functions";


const form = document.querySelector(".form")


form.addEventListener("submit", handleSubmit)
let page=1;
let inputValue=""

loadMore.addEventListener("click",handleLoadMore)



async function handleSubmit(event){
    event.preventDefault();
    inputValue=event.currentTarget.elements["search-text"].value.trim()

    if(inputValue===""){
    iziToast.warning({
    position:`topRight`,
    message: 'Please fill out this field.',
    backgroundColor: `white`
});
return;
    
    } 
        page=1;
        clearGallery();
        showLoader();
        hideLoadMoreButton();
        try{
            const data= await getImagesByQuery(inputValue,page)
            if(data.hits.length===0){
                iziToast.error({
    position:`topRight`,
    message: 'Sorry, there are no images matching your search query. Please try again!',
    backgroundColor: `red`,
    messageColor:"white"
});


            } else{
                createGallery(data.hits);
                const totalPage=Math.ceil(data.totalHits/15);
                if(totalPage>=1){showLoadMoreButton();}
                
                
            }
        } catch(err){console.log(err);
        iziToast.error({
    position:`topRight`,
    message: `Something went wrong. Please try again later.`,
    backgroundColor: `red`,
    messageColor:"white"
})
        } finally{
        hideLoader();
        event.target.reset();
        }

        
    
}

async function handleLoadMore(event){
    page++
    loadMore.disabled=true;
    showLoader()
try{
    const data= await getImagesByQuery(inputValue,page)
    
    createGallery(data.hits);
    const totalPage = Math.ceil(data.totalHits/15)
    
    if (page>=totalPage){
    hideLoadMoreButton();
    iziToast.warning({
    position:`topRight`,
    message: "We're sorry, but you've reached the end of search results.",
    backgroundColor: `white`
});
    }
    const card = document.querySelector(".gallery-item")
    const cardHeight=card.getBoundingClientRect().height;
    window.scrollBy({
        top:cardHeight*2,
        left:0,
        behavior:"smooth"
    })

  }
  catch(err){
    console.log(err.message);
    
    iziToast.error({
    position:`topRight`,
    message: `Something went wrong. Please try again later.`,
    backgroundColor: `red`,
    messageColor:"white"
})
  }
  finally{hideLoader()
    loadMore.disabled=false
  }
} 