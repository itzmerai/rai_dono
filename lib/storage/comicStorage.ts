import * as FileSystem from 'expo-file-system';

export const saveComic = async (id: string, data: any) => {
  const path = `${FileSystem.documentDirectory}comics/${id}.json`;
  await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
};

export const loadComic = async (id: string) => {
  const path = `${FileSystem.documentDirectory}comics/${id}.json`;
  const data = await FileSystem.readAsStringAsync(path);
  return JSON.parse(data);
};
