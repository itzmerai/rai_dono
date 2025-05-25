
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function ComicCard({ comic }: { comic: any }) {
  const router = useRouter();
  const imageUrl = comic.md_covers?.[0]?.b2key
    ? `https://meo.comick.pictures/${comic.md_covers[0].b2key}`
    : undefined;

  return (
    <Pressable
      className="flex-row items-center space-x-4"
      onPress={() => router.push({ pathname: '/manga/[slug]', params: { slug: comic.slug } })}
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-16 h-24 rounded-md bg-gray-200"
          resizeMode="cover"
        />
      )}
      <View className="flex-1">
        <Text className="text-base font-semibold">{comic.title}</Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {comic.alt_title?.[0]}
        </Text>
      </View>
    </Pressable>
  );
}
