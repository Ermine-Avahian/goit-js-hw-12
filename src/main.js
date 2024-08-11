import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoadMoreButton,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

document.querySelector('form').addEventListener('submit', async e => {
  e.preventDefault();
  currentQuery = e.target.elements.query.value.trim();
  currentPage = 1;
  clearGallery();
  toggleLoadMoreButton(false);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.totalHits > 0) {
      renderGallery(data.hits);
      toggleLoadMoreButton(data.totalHits > currentPage * 15);
    }
  } catch (error) {
    console.error(error);
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);
    toggleLoadMoreButton(data.totalHits > currentPage * 15);
    scrollPage();
  } catch (error) {
    console.error(error);
  }
});

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
