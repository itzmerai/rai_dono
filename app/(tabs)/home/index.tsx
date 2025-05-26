import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';

type Comic = {
  title: string;
  md_covers?: { b2key: string }[];
  // add other properties as needed
};

const HomeScreen = () => {
  const [topComics, setTopComics] = useState<Comic[]>([]);

  useEffect(() => {
    fetch('https://api.comick.io/v1.0/search?sort=followed')
      .then((res) => res.json())
.then((data) => setTopComics(data?.results || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-lg font-bold mb-4">Top Comics</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topComics?.map((comic, index) => (
          <TouchableOpacity key={index} className="mr-4">
            <Image
              source={{ uri: `https://meo.comick.pictures/${comic.md_covers?.[0]?.b2key}` }}
              style={{ width: 120, height: 180, borderRadius: 8 }}
            />
            
            <Text numberOfLines={2} className="mt-2 w-[120px]">
              {comic.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;
