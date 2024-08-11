import axios from 'axios';

const API_KEY = '45375111-d1e8183fd09326f55157dfb1e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.totalHits === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}
