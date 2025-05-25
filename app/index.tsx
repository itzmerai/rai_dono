// app/index.tsx
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'https://api.comick.io/v1.0';

interface Manga {
  slug: string;
  title: string;
  md_covers: { b2key: string }[];
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchManga = async (q = '') => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setManga(json || []);
    } catch (e) {
      console.error('Error fetching manga:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga(); // Fetch default list
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search manga..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => fetchManga(query)}
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={manga}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/manga/${item.slug}`)}
            >
              <Image
                source={{ uri: `https://meo.comick.pictures/${item.md_covers?.[0]?.b2key}` }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  image: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
});
