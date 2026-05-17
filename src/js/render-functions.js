import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


 const gallery = document.querySelector(".gallery")
 const loader = document.querySelector(".loader")
 export const loadMore = document.querySelector(".js-load-more")


let lightbox = new SimpleLightbox('.gallery a',{captionsData:"alt",captionDelay:200});

export function createGallery(images){
    const markUp= images.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>`
    <li class="gallery-item">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="gallery-image"/></a>
    <ul class="gallery-item-list">
    <li><p>Likes<br> <span>${likes}</span></p></li>
    <li><p>Views<br> <span>${views}</span></p></li>
    <li><p>Comments<br> <span>${comments}</span></p></li>
    <li><p>Downloads<br> <span>${downloads}</span></p></li>
    
    </ul>
    </li>
    `).join("")

gallery.insertAdjacentHTML('beforeend', markUp);
   lightbox.refresh(); 
}

export function clearGallery(){
    gallery.innerHTML=""
}

export function showLoader(){
    loader.classList.remove("is-hidden")
}

export function hideLoader(){
    loader.classList.add("is-hidden");
}

export function showLoadMoreButton(){
    loadMore.classList.remove("is-hidden")
}

export function hideLoadMoreButton(){
loadMore.classList.add("is-hidden")  
}