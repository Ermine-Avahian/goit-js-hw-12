import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoadMoreButton,
  toggleEndMessage,
  scrollToNextPage,
} from './js/render-functions.js';

let query = '';
let page = 1;
const perPage = 15;

document
  .getElementById('search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();
    query = event.target.elements.query.value.trim();
    page = 1;

    if (!query) return;

    clearGallery();
    toggleLoadMoreButton(false);
    toggleEndMessage(false);

    try {
      const data = await fetchImages(query, page, perPage);
      renderGallery(data.hits);

      if (data.hits.length < perPage || data.totalHits <= page * perPage) {
        toggleEndMessage(true);
      } else {
        toggleLoadMoreButton(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

document.getElementById('load-more').addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);

    if (data.hits.length < perPage || data.totalHits <= page * perPage) {
      toggleLoadMoreButton(false);
      toggleEndMessage(true);
    }

    scrollToNextPage();
  } catch (error) {
    console.error('Error:', error);
  }
});
