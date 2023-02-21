import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { sample } from "./sample";
import axiosFunc from "./axiosFunc";

const input = document.getElementById('input')
const submit = document.getElementById('submit')  
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");

const fetchFunc = new axiosFunc();
let arr = 0

const onLoad = () => {
  fetchFunc.incrementPage()
  fetchFunc.fechArr().then(result => {
    let array = result.data
    const createGallery = (items) => {
      arr += array.hits.length
      if (arr >= array.totalHits) {
        loadMore.style.display = 'none'
      } else {
        loadMore.style.display = 'block'
      }
      return items.hits.map((item) => sample(item)).join("");
  }
  if (array.hits.length < 1) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMore.style.display = 'none'
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
  
  /*if (array.hits.length == arr) {
    loadMore.style.display = 'none'
  }*/
  /*if (array.hits.length = array.totalHits) {
    loadMore.style.display = 'none'
  }*/

  }).catch(error => console.log(error.message));
}

const showItems = (event) => {
  loadMore.style.display = 'none'
  event.preventDefault()
  fetchFunc.quary = input.value
  fetchFunc.resetPage()
  fetchFunc.fechArr().then(result => {
    let array = result.data
    const createGallery = (items) => {
      if (array.hits.length > 1) {
        Notiflix.Notify.success(`Hooray! We found ${array.totalHits} images.`);
      }
      arr += array.hits.length
      if (arr >= array.totalHits) {
        loadMore.style.display = 'none'
      } else {
        loadMore.style.display = 'block'
      }
      return items.hits.map((item) => sample(item)).join("");
  }
  gallery.innerHTML = createGallery(array)
  let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

  loadMore.style.display = 'block'
  if (array.hits.length < 1) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMore.style.display = 'none'
  }
  if (array.hits.length < 12) {
    loadMore.style.display = 'none'
  }
  }).catch(error => console.log(error.message));
};

submit.addEventListener("click", showItems)
loadMore.addEventListener("click", onLoad)
