import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// ✅ EDGE CASE 2 FIX: No unstable_settings export. If you need
// initialRouteName, set it directly on the <Tabs> component.

export default function TabLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
