import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';

type Comic = {
  title: string;
  desc?: string;
  genres?: string[];
  status?: string;
  md_covers?: { b2key: string }[];
};

export default function MangaDetailsScreen() {
  const { slug } = useLocalSearchParams();
  const [comic, setComic] = useState<Comic | null>(null);

  useEffect(() => {
    fetch(`https://api.comick.io/v1.0/comic/${slug}`)
      .then((res) => res.json())
      .then((data) => setComic(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!comic) return <Text className="p-4">Loading...</Text>;

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-xl font-bold mb-2">{comic.title}</Text>

      <Image
        source={{ uri: `https://meo.comick.pictures/${comic.md_covers?.[0]?.b2key}` }}
        style={{ width: 200, height: 300, borderRadius: 10, marginBottom: 16 }}
      />

      <Text className="text-gray-700 mb-4">{comic.desc || 'No description available.'}</Text>

      <Text className="font-semibold">Genres:</Text>
      <Text>{comic.genres?.join(', ')}</Text>

      <Text className="font-semibold mt-4">Status:</Text>
      <Text>{comic.status}</Text>
    </ScrollView>
  );
}
