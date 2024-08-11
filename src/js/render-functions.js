import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a href="${largeImageURL}" class="gallery__item">
          <img
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
            class="gallery__image"
          />
          <div class="gallery__info">
            <p>
              <b>Likes:</b> ${likes}
            </p>
            <p>
              <b>Views:</b> ${views}
            </p>
            <p>
              <b>Comments:</b> ${comments}
            </p>
            <p>
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </a>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMoreButton(show) {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.classList.toggle('hidden', !show);
}

export function toggleEndMessage(show) {
  const endMessage = document.getElementById('end-message');
  endMessage.classList.toggle('hidden', !show);
}

export function scrollToNextPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery__item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
