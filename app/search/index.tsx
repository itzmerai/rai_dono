import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type ComicResult = {
  slug: string;
  title: string;
  authors?: string[];
  md_covers?: { b2key: string }[];
};

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ComicResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchComics = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.comick.fun/v1.0/search/?q=${query}`);
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) searchComics();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <TextInput
        placeholder="Search comics..."
        value={query}
        onChangeText={setQuery}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/manga/${item.slug}`)}
              className="flex-row mb-4 items-center"
            >
              <Image
                source={{
                  uri: `https://meo.comick.pictures/${item.md_covers?.[0]?.b2key}`,
                }}
                className="w-16 h-20 rounded mr-4 bg-gray-200"
              />
              <View>
                <Text className="font-bold text-base">{item.title}</Text>
                <Text className="text-gray-500">{item.authors?.[0]}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
