import ComicList from '@/components/ComicList';
import { getBookmarks } from '@/lib/storage/bookmarkStorage';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';

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
      className="p-4"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text className="text-xl font-bold mb-4">My Bookmarked Comics</Text>
      <ComicList comics={bookmarks} emptyMessage="No bookmarks yet." />
    </ScrollView>
  );
}
