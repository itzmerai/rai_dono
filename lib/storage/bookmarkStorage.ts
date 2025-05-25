import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'bookmarked_comics';

export const getBookmarks = async (): Promise<any[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const addBookmark = async (comic: any) => {
  const bookmarks = await getBookmarks();
  const updated = [...bookmarks, comic];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const removeBookmark = async (slug: string) => {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter((comic) => comic.slug !== slug);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const isBookmarked = async (slug: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return bookmarks.some((comic) => comic.slug === slug);
};
