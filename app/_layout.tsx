import { Stack } from 'expo-router';

// ❌ EDGE CASE 1: No manual getInitialURL handling.
// When the app is killed and a deep link fires, getInitialURL() resolves
// before the navigator mounts. The URL is consumed but navigation fails
// silently — the app lands on the Home tab instead of the target route.
// This only happens in standalone builds (TestFlight, EAS Build), never
// in Expo Go or development mode.

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{ presentation: 'modal', title: 'Product' }}
      />
    </Stack>
  );
}
