
import ComicList from '@/components/ComicList';
import HorizontalScroller from '@/components/HorizontalScroller';
import { getTopComics } from '@/lib/api/comickApi';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const [topComics, setTopComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComics = async () => {
      try {
        const data = await getTopComics();
        setTopComics(data);
      } catch (err) {
        console.error('Failed to load comics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadComics();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView className="p-4 space-y-6">
      <View>
        <Text className="text-xl font-bold mb-2">Followed</Text>
        <HorizontalScroller comics={topComics.slice(0, 10)} />
      </View>

      <View>
        <Text className="text-xl font-bold mb-2">Reading History</Text>
        <ComicList comics={[]} emptyMessage="No reading history yet." />
      </View>

      <View>
        <Text className="text-xl font-bold mb-2">New Updates</Text>
        <ComicList comics={topComics.slice(10)} />
      </View>
    </ScrollView>
  );
}
