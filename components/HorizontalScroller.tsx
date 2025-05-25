import React from 'react';
import { ScrollView, View } from 'react-native';
import ComicCard from './ComicCard';

export default function HorizontalScroller({ comics }: { comics: any[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {comics.map((comic) => (
        <View key={comic.slug} className="mr-4">
          <ComicCard comic={comic} />
        </View>
      ))}
    </ScrollView>
  );
}
