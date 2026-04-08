import { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';

// ✅ EDGE CASE 1 FIX: Defer getInitialURL consumption until the navigator
// reports it's ready via onReady. This prevents the race condition where
// the URL is consumed before the navigator can handle it.

export default function RootLayout() {
  const router = useRouter();
  const isReady = useRef(false);

  useEffect(() => {
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url && isReady.current) {
        const path = url.replace(/^[a-z]+:\/\//, '/');
        router.replace(path as any);
      }
    };

    handleInitialURL();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const path = url.replace(/^[a-z]+:\/\//, '/');
      router.push(path as any);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Stack onReady={() => { isReady.current = true; }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{ presentation: 'modal', title: 'Product' }}
      />
    </Stack>
  );
}
