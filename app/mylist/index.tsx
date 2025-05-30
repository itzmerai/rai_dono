import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import ComicList from '../../components/ComicList';
import { getBookmarks } from '../../lib/storage/bookmarkStorage';

export default function MyListScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookmarks();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>My Bookmarked Comics</Text>
      <ComicList comics={bookmarks} emptyMessage="No bookmarks yet." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
