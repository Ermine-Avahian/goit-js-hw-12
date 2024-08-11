import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  toggleLoadMoreButton,
  showEndOfResultsMessage,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
const perPage = 15;
const lightbox = new SimpleLightbox('.gallery a');

document.querySelector('.search-form').addEventListener('submit', onSearch);
document.querySelector('.load-more').addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  currentQuery = event.target.elements.searchQuery.value.trim();
  if (!currentQuery) return;
  currentPage = 1;
  clearGallery();
  toggleLoadMoreButton(false);

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    renderImages(data.hits);
    lightbox.refresh();

    if (data.totalHits > perPage) {
      toggleLoadMoreButton(true);
    } else {
      toggleLoadMoreButton(false);
    }
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    renderImages(data.hits);
    lightbox.refresh();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage >= totalPages) {
      toggleLoadMoreButton(false);
      showEndOfResultsMessage();
    } else {
      smoothScroll();
    }
  } catch (error) {
    console.error(error);
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
