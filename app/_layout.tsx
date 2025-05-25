
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      
      <Tabs.Screen name="home" />
      <Tabs.Screen name="mylist" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
