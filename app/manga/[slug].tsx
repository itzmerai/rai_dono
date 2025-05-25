import { getChaptersBySlug, getComicDetails } from '@/lib/api/comickApi';
import {
    addBookmark,
    isBookmarked,
    removeBookmark,
} from '@/lib/storage/bookmarkStorage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';

export default function MangaDetailsScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const [comic, setComic] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const loadComic = async () => {
      try {
        const data = await getComicDetails(slug as string);
        setComic(data);
        const chaps = await getChaptersBySlug(slug as string);
        setChapters(chaps);

        const isSaved = await isBookmarked(slug as string);
        setBookmarked(isSaved);
      } catch (err) {
        Alert.alert('Error', 'Failed to load comic.');
      } finally {
        setLoading(false);
      }
    };

    loadComic();
  }, [slug]);

  const toggleBookmark = async () => {
    if (!comic) return;
    if (bookmarked) {
      await removeBookmark(comic.slug);
      setBookmarked(false);
    } else {
      await addBookmark(comic);
      setBookmarked(true);
    }
  };

  if (loading || !comic) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const imageUrl = comic.md_covers?.[0]?.b2key
    ? `https://meo.comick.pictures/${comic.md_covers[0].b2key}`
    : undefined;

  return (
    <ScrollView className="p-4 space-y-4">
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-64 rounded-xl bg-gray-300"
          resizeMode="cover"
        />
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">{comic.title}</Text>
        <Pressable
          onPress={toggleBookmark}
          className={`px-4 py-1 rounded-full ${
            bookmarked ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <Text className="text-white">
            {bookmarked ? 'Unbookmark' : 'Bookmark'}
          </Text>
        </Pressable>
      </View>

      <Text className="text-sm text-gray-600">
        {comic.desc || 'No description.'}
      </Text>

      <View className="flex-row flex-wrap gap-2 mt-2">
        {comic.genres?.map((genre: string) => (
          <Text
            key={genre}
            className="bg-gray-200 px-2 py-1 rounded text-sm text-gray-700"
          >
            {genre}
          </Text>
        ))}
      </View>

      <Text className="text-xl font-semibold mt-4 mb-2">Chapters</Text>
      <View className="space-y-2">
        {chapters.map((chapter: any) => (
          <Pressable
            key={chapter.hid}
            className="p-3 bg-gray-100 rounded-lg"
            onPress={() =>
              // navigate to chapter reader
              // make sure this file exists: reader/[hid].tsx
              router.push(`/reader/${chapter.hid}`)
            }
          >
            <Text className="font-medium">
              Chapter {chapter.chapter} – {chapter.title || 'No title'}
            </Text>
            <Text className="text-xs text-gray-500">
              {new Date(chapter.created_at).toLocaleDateString()}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
