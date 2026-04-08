import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Product ID</Text>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.description}>
          This modal was opened via deep link or navigation. The product ID
          above was parsed from the URL parameter.
        </Text>
      </View>

      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#adb5bd',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  id: {
    fontSize: 48,
    fontWeight: '800',
    color: '#4a6cf7',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
