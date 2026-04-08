# DeepLink Showcase App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a showcase Expo Router app demonstrating 5 deep linking edge cases as a linear chain of branches (broken → fix pairs).

**Architecture:** Expo SDK 55 file-based routing with two tabs (Home, Explore) and a product modal. Each edge case is introduced as a broken commit then fixed in the next branch. Branches are numbered `01-base-setup` through `10-testing-checklist`.

**Tech Stack:** Expo SDK 55, Expo Router, React Native, @expo/vector-icons, TypeScript

---

### Task 1: Scaffold Expo SDK 55 Project

**Files:**
- Create: entire project via `create-expo-app`
- Modify: `app.json` (add scheme)
- Delete: template files we don't need

- [ ] **Step 1: Create project in current directory**

Since the repo already exists with a README and .git, initialize the Expo project here:

```bash
cd /Users/marinmikulec/Development/Projects/Personal/DeeplinkShowcase
npx create-expo-app@latest . --template tabs --yes
```

If it complains about existing files, use a temp directory and move files:

```bash
npx create-expo-app@latest temp-app --template tabs --yes
cp -r temp-app/* temp-app/.* . 2>/dev/null || true
rm -rf temp-app
```

- [ ] **Step 2: Add scheme to app.json**

Open `app.json` and add the `scheme` field under `expo`:

```json
{
  "expo": {
    "scheme": "deeplinkdemo",
    ...
  }
}
```

- [ ] **Step 3: Install expo-linking**

```bash
npx expo install expo-linking
```

- [ ] **Step 4: Verify the app runs**

```bash
npx expo start
```

Press `i` for iOS simulator or `a` for Android. Confirm the default tabs template loads.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Expo SDK 55 project with tabs template"
```

---

### Task 2: Build Base App Structure (`01-base-setup` branch)

**Files:**
- Modify: `app/_layout.tsx` (root Stack with modal)
- Modify: `app/(tabs)/_layout.tsx` (Home + Explore tabs with icons)
- Rewrite: `app/(tabs)/index.tsx` (Home — deep link tester screen)
- Rewrite: `app/(tabs)/explore.tsx` (Explore — placeholder)
- Create: `app/product/[id].tsx` (product modal)

- [ ] **Step 1: Create branch**

```bash
git checkout -b 01-base-setup
```

- [ ] **Step 2: Rewrite `app/_layout.tsx` — Root layout with Stack**

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

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
```

- [ ] **Step 3: Rewrite `app/(tabs)/_layout.tsx` — Tab navigator**

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

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
```

- [ ] **Step 4: Rewrite `app/(tabs)/index.tsx` — Home screen (Deep Link Tester)**

```typescript
// app/(tabs)/index.tsx
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
```

- [ ] **Step 5: Install expo-clipboard**

```bash
npx expo install expo-clipboard
```

- [ ] **Step 6: Rewrite `app/(tabs)/explore.tsx` — Explore screen**

```typescript
// app/(tabs)/explore.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.body}>
        This is a placeholder tab to demonstrate tab navigation alongside deep
        linking. Deep links target the Product modal, not this screen.
      </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1a1a2e',
  },
  body: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
```

- [ ] **Step 7: Create `app/product/[id].tsx` — Product modal**

```bash
mkdir -p app/product
```

```typescript
// app/product/[id].tsx
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
```

- [ ] **Step 8: Clean up unused template files**

Remove any template files not needed (e.g. template's default `+not-found.tsx`, extra components, constants directories). Keep only the files we defined above.

```bash
# Remove template extras — adjust based on what the template actually generates
rm -rf app/+not-found.tsx app/+html.tsx components/ constants/ hooks/ 2>/dev/null || true
```

- [ ] **Step 9: Verify the app runs**

```bash
npx expo start
```

Confirm: two tabs load, Home shows deep link URLs, tapping a link row copies URL, navigating to product modal works via `router.push('/product/123')`.

- [ ] **Step 10: Commit and push branch**

```bash
git add -A
git commit -m "feat: base app with tabs, product modal, and deep link tester"
git push -u origin 01-base-setup
```

---

### Task 3: Edge Case 1 — Broken (`02-killed-app-bug` branch)

**Files:**
- No file changes needed — the base `_layout.tsx` already has no `getInitialURL` handling

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 02-killed-app-bug
```

- [ ] **Step 2: Add explanatory comment to root layout**

Modify `app/_layout.tsx` to add a comment explaining this is the "broken" state:

```typescript
// app/_layout.tsx
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
```

- [ ] **Step 3: Add edge case info to Home screen**

Add a status banner to `app/(tabs)/index.tsx`. Insert this section right after the title/subtitle, before the "Test Deep Links" section:

```typescript
      <View style={[styles.section, { backgroundColor: '#fff3f3', borderColor: '#ffcdd2', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#c62828' }]}>
          🔴 Edge Case 1: Killed-App Bug
        </Text>
        <Text style={styles.body}>
          This branch has NO getInitialURL handling. If you build this with EAS,
          kill the app, then open a deep link — it will land on Home instead of
          the target route.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: demonstrate killed-app getInitialURL bug (edge case 1)"
git push -u origin 02-killed-app-bug
```

---

### Task 4: Edge Case 1 — Fix (`03-killed-app-fix` branch)

**Files:**
- Modify: `app/_layout.tsx` (add getInitialURL + onReady + foreground listener)
- Modify: `app/(tabs)/index.tsx` (update banner to green)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 03-killed-app-fix
```

- [ ] **Step 2: Rewrite `app/_layout.tsx` with the fix**

```typescript
// app/_layout.tsx
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

    // Handle foreground/background links
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
```

- [ ] **Step 3: Update Home screen banner to green**

In `app/(tabs)/index.tsx`, replace the red edge case banner with:

```typescript
      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 1: Fixed
        </Text>
        <Text style={styles.body}>
          getInitialURL is now deferred until onReady fires. Foreground links
          are handled via Linking.addEventListener. Compare this branch's
          _layout.tsx with the previous branch to see the diff.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "fix: defer getInitialURL until navigator ready (edge case 1)"
git push -u origin 03-killed-app-fix
```

---

### Task 5: Edge Case 2 — Broken (`04-unstable-settings-bug` branch)

**Files:**
- Modify: `app/(tabs)/_layout.tsx` (add unstable_settings export)
- Modify: `app/(tabs)/index.tsx` (update banner)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 04-unstable-settings-bug
```

- [ ] **Step 2: Add `unstable_settings` to tab layout**

Modify `app/(tabs)/_layout.tsx`:

```typescript
// app/(tabs)/_layout.tsx
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
```

- [ ] **Step 3: Update Home screen banner**

In `app/(tabs)/index.tsx`, replace the green edge case 1 banner with:

```typescript
      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 1: Fixed
        </Text>
        <Text style={styles.body}>
          getInitialURL is deferred until onReady. See branch 03-killed-app-fix.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: '#fff3f3', borderColor: '#ffcdd2', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#c62828' }]}>
          🔴 Edge Case 2: unstable_settings Bug
        </Text>
        <Text style={styles.body}>
          This branch exports an empty unstable_settings object from the tab
          layout. Try opening a deep link while the app is running — nothing
          will happen.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: add empty unstable_settings to reproduce edge case 2"
git push -u origin 04-unstable-settings-bug
```

---

### Task 6: Edge Case 2 — Fix (`05-unstable-settings-fix` branch)

**Files:**
- Modify: `app/(tabs)/_layout.tsx` (remove unstable_settings, add initialRouteName)
- Modify: `app/(tabs)/index.tsx` (update banner)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 05-unstable-settings-fix
```

- [ ] **Step 2: Fix tab layout**

Rewrite `app/(tabs)/_layout.tsx`:

```typescript
// app/(tabs)/_layout.tsx
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
```

- [ ] **Step 3: Update Home screen banner**

In `app/(tabs)/index.tsx`, replace the red edge case 2 banner with green:

```typescript
      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 2: Fixed
        </Text>
        <Text style={styles.body}>
          unstable_settings removed. initialRouteName set directly on Tabs.
          See branch 05-unstable-settings-fix.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "fix: remove unstable_settings, use initialRouteName on Tabs (edge case 2)"
git push -u origin 05-unstable-settings-fix
```

---

### Task 7: Edge Case 3 — Broken (`06-modal-back-bug` branch)

**Files:**
- Modify: `app/(tabs)/index.tsx` (update banner)

The product modal from `01-base-setup` already only has `router.back()` with no fallback — that IS the broken state. We just need to label it.

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 06-modal-back-bug
```

- [ ] **Step 2: Update Home screen banner**

Add a new red banner section to `app/(tabs)/index.tsx`:

```typescript
      <View style={[styles.section, { backgroundColor: '#fff3f3', borderColor: '#ffcdd2', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#c62828' }]}>
          🔴 Edge Case 3: Modal Back Navigation Bug
        </Text>
        <Text style={styles.body}>
          Deep link to deeplinkdemo://product/123 from a killed app. The modal
          opens but the back button goes nowhere — there's no screen below it
          in the stack.
        </Text>
      </View>
```

- [ ] **Step 3: Commit and push**

```bash
git add -A
git commit -m "feat: label modal back navigation bug (edge case 3)"
git push -u origin 06-modal-back-bug
```

---

### Task 8: Edge Case 3 — Fix (`07-modal-back-fix` branch)

**Files:**
- Modify: `app/product/[id].tsx` (add canGoBack check + conditional dismiss)
- Modify: `app/(tabs)/index.tsx` (update banner)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 07-modal-back-fix
```

- [ ] **Step 2: Fix product modal**

Rewrite `app/product/[id].tsx`:

```typescript
// app/product/[id].tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigationState } from '@react-navigation/native';

// ✅ EDGE CASE 3 FIX: Check if there's a screen below this modal.
// If the user arrived via deep link, the stack is empty — show "Close"
// instead of "Back" and navigate to the tabs root.

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const canGoBack = useNavigationState((state) => state?.index > 0);

  const handleDismiss = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

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

      <Pressable onPress={handleDismiss} style={styles.button}>
        <Text style={styles.buttonText}>
          {canGoBack ? '← Back' : '✕ Close'}
        </Text>
      </Pressable>

      {!canGoBack && (
        <Text style={styles.hint}>
          No back stack — you arrived here via deep link
        </Text>
      )}
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
  hint: {
    fontSize: 12,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
});
```

- [ ] **Step 3: Update Home screen banner**

Replace the red edge case 3 banner with green:

```typescript
      <View style={[styles.section, { backgroundColor: '#f1f8e9', borderColor: '#c5e1a5', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>
          ✅ Edge Case 3: Fixed
        </Text>
        <Text style={styles.body}>
          Modal now checks canGoBack. Shows "Close" when deep linked (empty
          stack) and navigates to tabs root. See branch 07-modal-back-fix.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "fix: add canGoBack check to product modal (edge case 3)"
git push -u origin 07-modal-back-fix
```

---

### Task 9: Universal Links Setup (`08-universal-links-setup` branch)

**Files:**
- Modify: `app.json` (add associatedDomains + intentFilters)
- Modify: `app/(tabs)/index.tsx` (add info section)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 08-universal-links-setup
```

- [ ] **Step 2: Update `app.json` with universal link config**

Add to the `expo.ios` and `expo.android` sections:

```json
{
  "expo": {
    "scheme": "deeplinkdemo",
    "ios": {
      "associatedDomains": ["applinks:yourdomain.com"]
    },
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            { "scheme": "https", "host": "yourdomain.com" }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

- [ ] **Step 3: Add universal links info section to Home screen**

Add a new section to `app/(tabs)/index.tsx` after the edge case banners:

```typescript
      <View style={[styles.section, { backgroundColor: '#e3f2fd', borderColor: '#90caf9', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#1565c0' }]}>
          ℹ️ Edge Case 4: Universal Links
        </Text>
        <Text style={styles.body}>
          app.json now includes associatedDomains (iOS) and intentFilters
          (Android). For these to work, you must host an AASA file at:{'\n\n'}
        </Text>
        <Text style={styles.mono}>
          https://yourdomain.com/.well-known/apple-app-site-association
        </Text>
        <Text style={[styles.body, { marginTop: 8 }]}>
          Content-Type must be application/json. Without it, universal links
          silently fall back to Safari — no error, no logs.
        </Text>
      </View>
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: add universal links config to app.json (edge case 4)"
git push -u origin 08-universal-links-setup
```

---

### Task 10: Scheme Trap Demo (`09-scheme-trap-demo` branch)

**Files:**
- Modify: `app/(tabs)/index.tsx` (add scheme comparison section)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 09-scheme-trap-demo
```

- [ ] **Step 2: Add scheme comparison to Home screen**

Add a new section to `app/(tabs)/index.tsx`:

```typescript
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
            <Text style={styles.linkUrl}>{Linking.createURL('/product/123')}</Text>
          </View>
        </View>
        <Text style={[styles.body, { marginTop: 8 }]}>
          In Expo Go the dynamic URL uses exp:// instead of deeplinkdemo://.
          Always use Linking.createURL() in your code.
        </Text>
      </View>
```

- [ ] **Step 3: Commit and push**

```bash
git add -A
git commit -m "feat: show hardcoded vs dynamic scheme comparison (edge case 4b)"
git push -u origin 09-scheme-trap-demo
```

---

### Task 11: Testing Checklist (`10-testing-checklist` branch)

**Files:**
- Create: `TESTING.md`
- Modify: `README.md` (add branch index)
- Modify: `app/(tabs)/index.tsx` (add testing section)

- [ ] **Step 1: Create branch from previous**

```bash
git checkout -b 10-testing-checklist
```

- [ ] **Step 2: Create `TESTING.md`**

```markdown
# Deep Link Testing Checklist

## Pre-Ship Ritual

Run these checks before every release that involves deep-linkable routes.

### iOS — Custom Scheme

```bash
# Test from killed state
# (Kill the app in simulator first, then run:)
npx uri-scheme open "deeplinkdemo://product/99" --ios

# Expected: app launches directly to product/99 modal
```

### iOS — Universal Links

```bash
# Must test on a REAL DEVICE — Universal Links don't work in iOS Simulator
xcrun simctl openurl booted "https://yourdomain.com/product/99"

# Expected: same result (on real device)
```

### Android — Custom Scheme

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "deeplinkdemo://product/99" com.yourname.deeplinkdemo

# Expected: app launches directly to product/99 modal
```

### Android — App Links

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://yourdomain.com/product/99" \
  com.yourname.deeplinkdemo

# Verify App Links verification status
adb shell pm get-app-links com.yourname.deeplinkdemo
# Expected: "Verification link handled: ALWAYS"
```

### AASA Validation

```bash
curl -I https://yourdomain.com/.well-known/apple-app-site-association | grep content-type
# Expected: application/json
```

## Checklist

- [ ] Test from killed state (iOS + Android) with custom scheme
- [ ] Test from background state
- [ ] Test from foreground state
- [ ] Test universal links on both platforms
- [ ] Verify AASA Content-Type header
- [ ] Test on a real device (not just simulator)
- [ ] Verify adb app-links verification passes on Android
- [ ] Check that all deep-linkable modals have an explicit dismiss action
- [ ] Remove or avoid unstable_settings on any route that's a deep link target
```

- [ ] **Step 3: Update `README.md` with branch index**

```markdown
# Deep Link Showcase

A companion app for the blog post **"Expo Router Deep Linking: The Edge Cases Nobody Warns You About."**

Built with Expo SDK 55 and Expo Router.

## Branch Index

Each branch demonstrates a specific deep linking edge case. Branches build on each other linearly.

| Branch | Edge Case | Description |
|--------|-----------|-------------|
| [`01-base-setup`](../../tree/01-base-setup) | — | Base Expo Router app with tabs and product modal |
| [`02-killed-app-bug`](../../tree/02-killed-app-bug) | #1 Broken | No getInitialURL handling — killed-app links land on Home |
| [`03-killed-app-fix`](../../tree/03-killed-app-fix) | #1 Fixed | Defer getInitialURL until navigator is ready |
| [`04-unstable-settings-bug`](../../tree/04-unstable-settings-bug) | #2 Broken | Empty unstable_settings breaks foreground links |
| [`05-unstable-settings-fix`](../../tree/05-unstable-settings-fix) | #2 Fixed | Remove unstable_settings, use initialRouteName |
| [`06-modal-back-bug`](../../tree/06-modal-back-bug) | #3 Broken | Modal has no fallback — back goes nowhere from deep link |
| [`07-modal-back-fix`](../../tree/07-modal-back-fix) | #3 Fixed | canGoBack check with conditional Back/Close |
| [`08-universal-links-setup`](../../tree/08-universal-links-setup) | #4 | Universal Links + App Links config in app.json |
| [`09-scheme-trap-demo`](../../tree/09-scheme-trap-demo) | #4b | Hardcoded scheme vs Linking.createURL() comparison |
| [`10-testing-checklist`](../../tree/10-testing-checklist) | #5 | Pre-ship testing checklist and CLI commands |

## Quick Start

```bash
git clone https://github.com/Majki1/DeeplinkShowcase.git
cd DeeplinkShowcase
npm install
npx expo start
```

## Testing Deep Links

See [TESTING.md](./TESTING.md) for the full testing checklist and CLI commands.

## Custom Scheme

```
deeplinkdemo://product/123
```

## License

MIT
```

- [ ] **Step 4: Add testing section to Home screen**

Add a new section to `app/(tabs)/index.tsx`:

```typescript
      <View style={[styles.section, { backgroundColor: '#f3e5f5', borderColor: '#ce93d8', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#7b1fa2' }]}>
          🧪 Edge Case 5: Testing Tools
        </Text>
        <Text style={styles.body}>
          You can't test deep links properly in the simulator's Safari.{'\n\n'}
          iOS: npx uri-scheme open "deeplinkdemo://product/123" --ios{'\n\n'}
          Android: adb shell am start -W -a android.intent.action.VIEW -d
          "deeplinkdemo://product/123"{'\n\n'}
          See TESTING.md for the full pre-ship checklist.
        </Text>
      </View>
```

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "feat: add testing checklist and branch index README (edge case 5)"
git push -u origin 10-testing-checklist
```

---

### Task 12: Merge to Main

- [ ] **Step 1: Switch to main and merge**

```bash
git checkout main
git merge 10-testing-checklist
```

- [ ] **Step 2: Push main**

```bash
git push origin main
```

- [ ] **Step 3: Verify all branches exist on remote**

```bash
git branch -r
```

Expected: all 10 branches plus main visible on origin.
