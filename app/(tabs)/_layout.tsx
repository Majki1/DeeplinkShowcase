import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// ❌ EDGE CASE 2: Even an empty unstable_settings export breaks foreground
// and background deep links. The link arrives, the URL event fires, but
// navigation never happens. No error. No warning. Silence.
export const unstable_settings = {};

export default function TabLayout() {
  return (
    <Tabs>
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
