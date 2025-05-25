import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BASE_URL = 'https://api.comick.fun';

export default function MangaDetails() {
  const { slug } = useLocalSearchParams();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/manga/${slug}`)
      .then((res) => res.json())
      .then(setDetails)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://meo.comick.pictures/${details.md_covers?.[0]?.b2key}` }}
        style={styles.cover}
      />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.desc}>{details.desc || 'No description'}</Text>

      {details.chapters?.map((chap: any) => (
        <TouchableOpacity
          key={chap.hid}
            onPress={() =>
            router.push({ pathname: '/reader/[hid]', params: { hid: chap.hid } })
            }
          style={styles.chapter}
        >
          <Text>Ch. {chap.chap || 'N/A'} — {chap.title || ''}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  cover: { width: 150, height: 200, alignSelf: 'center', borderRadius: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  desc: { fontSize: 14, marginBottom: 20 },
  chapter: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
