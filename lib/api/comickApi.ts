const BASE_URL = 'https://api.comick.fun';

export const getTopComics = async () => {
  const res = await fetch(`${BASE_URL}/top`);
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/category/`);
  return res.json();
};

export const getChapter = async (hid: string) => {
  const res = await fetch(`${BASE_URL}/chapter/${hid}/`);
  return res.json();
};

export const getChapterImages = async (hid: string) => {
  const res = await fetch(`${BASE_URL}/chapter/${hid}/get_images`);
  return res.json();
};

export const getComicChapters = async (hid: string) => {
  const res = await fetch(`${BASE_URL}/comic/${hid}/chapters`);
  return res.json();
};

export const getComicDetails = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/comic/${slug}/`);
  return res.json();
};

export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/`);
  return res.json();
};

export const getAuthorDetails = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/people/${slug}/`);
  return res.json();
};

export const searchComics = async (query: string) => {
  const res = await fetch(`${BASE_URL}/v1.0/search/?q=${encodeURIComponent(query)}`);
  return res.json();
};

export const getChaptersBySlug = async (slug: string) => {
  const res = await fetch(`https://api.comick.fun/comic/${slug}/chapters`);
  const data = await res.json();
  return data.chapters || [];
};
