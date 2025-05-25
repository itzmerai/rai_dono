import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ReaderScreen() {
  const { hid } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reader for Chapter ID: {hid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
