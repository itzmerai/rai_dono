import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native';

export default function ReaderScreen() {
  const { hid } = useLocalSearchParams();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hid) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`https://api.comick.fun/chapter/${hid}/get_images`);
        const data = await res.json();
        setImages(data || []);
      } catch (err) {
        Alert.alert('Error', 'Failed to load chapter images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [hid]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-black">
      {images.length === 0 ? (
        <Text className="text-white p-4">No images found for this chapter.</Text>
      ) : (
        images.map((url, index) => (
          <Image
            key={index}
            source={{ uri: `https://meo.comick.pictures/${url}` }}
            className="w-full h-[600px] mb-2"
            resizeMode="contain"
          />
        ))
      )}
    </ScrollView>
  );
}
