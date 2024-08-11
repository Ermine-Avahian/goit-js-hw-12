import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showNotification,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let query = '';
let page = 1;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    showNotification('Please enter a search query', 'warning');
    return;
  }

  clearGallery(galleryElement);
  page = 1;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  try {
    showLoader(loaderElement);
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please, try again!',
        'error'
      );
      loadMoreButton.classList.add('hidden');
      return;
    }

    renderGallery(data.hits, galleryElement);
    lightbox.refresh();

    if (page * 15 >= data.totalHits) {
      loadMoreButton.classList.add('hidden');
      showNotification(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
    } else {
      loadMoreButton.classList.remove('hidden');
    }

    smoothScrollToNext();
  } catch (error) {
    showNotification(error.message, 'error');
  } finally {
    hideLoader(loaderElement);
  }
}

function observeLoadMore() {
  loadMoreButton.addEventListener('click', async () => {
    page += 1;
    await fetchAndRenderImages();
  });
}

function smoothScrollToNext() {
  const galleryItem = document.querySelector('.gallery__item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

loadMoreButton.classList.add('hidden');
observeLoadMore();
