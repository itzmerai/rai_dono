import axios from 'axios';

const BASE_URL = 'https://api.comick.fun';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getTopComics = () => api.get('/top');

export const getCategories = () => api.get('/category/');

export const getChapterByHid = (hid: string) => api.get(`/chapter/${hid}/`);

export const getChapterImages = (hid: string) => api.get(`/chapter/${hid}/get_images`);

export const getComicChapters = (hid: string) => api.get(`/comic/${hid}/chapters`);

export const getComicBySlug = (slug: string) => api.get(`/comic/${slug}/`);

export const getGenreList = () => api.get('/genre/');

export const getPerson = (slug: string) => api.get(`/people/${slug}/`);

export const getComicV1 = (slug: string) => api.get(`/v1.0/comic/${slug}/`);

export const searchComics = (query: string) =>
  api.get('/v1.0/search/', { params: { q: query } });
