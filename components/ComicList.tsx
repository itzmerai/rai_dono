import React from 'react';
import { Text, View } from 'react-native';
import ComicCard from './ComicCard';

export default function ComicList({
  comics,
  emptyMessage,
}: {
  comics: any[];
  emptyMessage?: string;
}) {
  if (!comics.length) {
    return <Text className="text-gray-500 italic">{emptyMessage}</Text>;
  }

  return (
    <View className="space-y-3">
      {comics.map((comic) => (
        <ComicCard key={comic.slug} comic={comic} />
      ))}
    </View>
  );
}
