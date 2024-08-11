import iziToast from 'izitoast';

export function renderGallery(images, galleryElement) {
  const markup = images.map(image => createCardMarkup(image)).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
}

function createCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <a href="${largeImageURL}" class="gallery__item">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"/>
      <div class="gallery__info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `;
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

export function showNotification(message, type = 'info') {
  iziToast[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: message,
    position: 'topRight',
    backgroundColor: '#ef4040',
    titleColor: '#fafafb',
    messageColor: '#fafafb',
    borderBottom: '2px solid #ffbebe',
    borderRadius: '4px',
    padding: '20px',
    width: '432px',
    height: '88px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.03em',
    messageMaxWidth: '100%',
    messageOverflow: 'hidden',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  });
}

export function showLoader(loaderElement) {
  loaderElement.classList.add('visible');
}

export function hideLoader(loaderElement) {
  loaderElement.classList.remove('visible');
}
