import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import axios from "axios";

const input = document.getElementById('input')
const submit = document.getElementById('submit')  
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");

let pageNumber = 0;

const sample = (name) => {
  return `
  <a href="${name.largeImageURL}"> 
    <img src="${name.previewURL}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item info-item-1">
        <b>Likes</b>
        <span>${name.likes}</span>
      </p>
      <p class="info-item info-item-2">
        <b>Views</b>
        <span>${name.views}</span>
      </p>
      <p class="info-item info-item-3">
        <b>Comments</b>
        <span>${name.comments}</span>
      </p>
      <p class="info-item info-item-4">
        <b>Downloads</b>
        <span>${name.downloads}</span>
      </p>
    </div>
  </a>
  `
}

loadMore.addEventListener('click', () => {
  pageNumber++

  axios.get(`https://pixabay.com/api/?key=32993418-9f4f41ff9851a5ddec46140a8&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}`)
  .then((data) => {
    return data
  }).then((result) => {
    let array = result.data
    const createGallery = (items) => {
      return items.hits.map((item) => sample(item)).join("");
  }

  if (array.hits.length < 1) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }

  gallery.innerHTML += createGallery(array)

  let lightbox = new SimpleLightbox('.gallery a', { /* options */ });
  lightbox.refresh()


  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
  

  }).catch(error => console.log(error.message));
})


const showItems = (event) => {
  loadMore.style.display = 'none'
  pageNumber = 1
  event.preventDefault()
  gallery.innerHTML = ''

  axios.get(`https://pixabay.com/api/?key=32993418-9f4f41ff9851a5ddec46140a8&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}`)
  .then((data) => {
    return data
  }).then((result) => {
    let array = result.data
    const createGallery = (items) => {

      if (array.hits.length > 1) {
        Notiflix.Notify.success(`Hooray! We found ${array.totalHits} images.`);
      }
      return items.hits.map((item) => sample(item)).join("");
  }

  if (array.hits.length < 1) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMore.style.display = 'none'
  }

  gallery.innerHTML = createGallery(array)
  let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

  if (array.hits.length <= 12) {
    loadMore.style.display = 'none'
  } else {
    loadMore.style.display = 'block'
  }

  })
  .catch(error => console.log(error.message));
};

submit.addEventListener("click", showItems)
