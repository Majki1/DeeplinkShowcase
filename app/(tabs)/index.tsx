import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

function LinkRow({ label, url }: { label: string; url: string }) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(url);
    Alert.alert('Copied!', url);
  };

  return (
    <Pressable onPress={handleCopy} style={styles.linkRow}>
      <Text style={styles.linkLabel}>{label}</Text>
      <Text style={styles.linkUrl}>{url}</Text>
      <Text style={styles.linkHint}>Tap to copy</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const schemeUrl = 'deeplinkdemo://product/123';
  const dynamicUrl = Linking.createURL('/product/123');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Deep Link Showcase</Text>
      <Text style={styles.subtitle}>
        A companion app for "Expo Router Deep Linking: The Edge Cases Nobody
        Warns You About"
      </Text>

      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 1: Fixed
        </Text>
        <Text style={styles.body}>
          getInitialURL is deferred until onReady. See branch 03-killed-app-fix.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 2: Fixed
        </Text>
        <Text style={styles.body}>
          unstable_settings removed. initialRouteName set directly on Tabs.
          See branch 05-unstable-settings-fix.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 3: Fixed
        </Text>
        <Text style={styles.body}>
          Modal now checks canGoBack. Shows "Close" when deep linked (empty
          stack) and navigates to tabs root. See branch 07-modal-back-fix.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#e3f2fd', borderColor: '#90caf9', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#1565c0' }]}>
          ℹ️ Edge Case 4: Universal Links
        </Text>
        <Text style={styles.body}>
          app.json now includes associatedDomains (iOS) and intentFilters
          (Android). For these to work, you must host an AASA file at:
        </Text>
        <Text style={[styles.mono, { marginTop: 8 }]}>
          https://yourdomain.com/.well-known/apple-app-site-association
        </Text>
        <Text style={[styles.body, { marginTop: 8 }]}>
          Content-Type must be application/json. Without it, universal links
          silently fall back to Safari — no error, no logs.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#fff8e1', borderColor: '#ffe082', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#f57f17' }]}>
          ⚠️ Edge Case 4b: The Expo Go Trap
        </Text>
        <Text style={styles.body}>
          In Expo Go, your custom scheme doesn't exist. Compare these two URLs:
        </Text>
        <View style={{ marginTop: 12, gap: 8 }}>
          <View style={styles.linkRow}>
            <Text style={styles.linkLabel}>❌ Hardcoded (standalone only)</Text>
            <Text style={styles.linkUrl}>deeplinkdemo://product/123</Text>
          </View>
          <View style={styles.linkRow}>
            <Text style={styles.linkLabel}>✅ Linking.createURL (always works)</Text>
            <Text style={styles.linkUrl}>{dynamicUrl}</Text>
          </View>
        </View>
        <Text style={[styles.body, { marginTop: 8 }]}>
          In Expo Go the dynamic URL uses exp:// instead of deeplinkdemo://.
          Always use Linking.createURL() in your code.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Deep Links</Text>
        <Text style={styles.sectionDescription}>
          Copy a URL below, then open it from Safari, Notes, or the terminal
          using: npx uri-scheme open "URL" --ios
        </Text>
        <LinkRow label="Product 123 (scheme)" url={schemeUrl} />
        <LinkRow label="Product 456 (scheme)" url="deeplinkdemo://product/456" />
        <LinkRow label="Dynamic URL" url={dynamicUrl} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Scheme Info</Text>
        <Text style={styles.mono}>Scheme: deeplinkdemo://</Text>
        <Text style={styles.mono}>Linking.createURL: {dynamicUrl}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This App</Text>
        <Text style={styles.body}>
          Each branch in the repo demonstrates a different deep linking edge
          case. Check the README for the full branch index.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a2e',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  linkRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  linkUrl: {
    fontSize: 13,
    color: '#4a6cf7',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  linkHint: {
    fontSize: 11,
    color: '#adb5bd',
  },
  mono: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#495057',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
