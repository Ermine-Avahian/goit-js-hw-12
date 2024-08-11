export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
        <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMoreButton(show) {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.style.display = show ? 'block' : 'none';
}

export function showEndOfResultsMessage() {
  const endMessage = document.createElement('p');
  endMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  document.body.appendChild(endMessage);
}
