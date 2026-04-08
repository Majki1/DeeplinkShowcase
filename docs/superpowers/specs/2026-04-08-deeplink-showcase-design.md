# DeepLink Showcase App — Design Spec

## Overview

A showcase Expo Router app demonstrating 5 deep linking edge cases from the blog post "Expo Router Deep Linking: The Edge Cases Nobody Warns You About." Each edge case is presented as a broken → fix branch pair so readers can see the diff.

## Tech Stack

- Expo SDK 55
- Expo Router (file-based routing)
- React Native
- `@expo/vector-icons` for tab icons
- `StyleSheet.create` for styling (no external libraries)

## App Structure

```
app/
├── _layout.tsx              # Root Stack layout
├── (tabs)/
│   ├── _layout.tsx          # Tab navigator (Home, Explore)
│   ├── index.tsx            # Home — deep link tester, explanations
│   └── explore.tsx          # Explore — placeholder content
├── product/
│   └── [id].tsx             # Product detail modal (deep-linkable)
app.json                     # scheme: "deeplinkdemo"
```

- **Home screen**: Acts as a "Deep Link Tester" — displays the app scheme, lists example deep link URLs to copy, explains what each edge case branch demonstrates.
- **Explore screen**: Placeholder tab content.
- **Product modal**: Shows product ID, back/close button. Primary deep link target (`deeplinkdemo://product/123`).
- **Tab icons**: `@expo/vector-icons` (Ionicons or similar).

## Branch Strategy

Linear chain — each branch builds on the previous. Approach A from brainstorming.

| # | Branch | Description |
|---|--------|-------------|
| 1 | `01-base-setup` | Expo Router app with tabs, product modal, polished Home screen |
| 2 | `02-killed-app-bug` | No `getInitialURL` handling — killed-app deep links land on Home |
| 3 | `03-killed-app-fix` | Defer `getInitialURL` until `onReady`, add foreground listener |
| 4 | `04-unstable-settings-bug` | Add `export const unstable_settings = {}` — breaks foreground links |
| 5 | `05-unstable-settings-fix` | Remove export, use `initialRouteName` on `<Tabs>` |
| 6 | `06-modal-back-bug` | Modal only has `router.back()` — no fallback for empty stack |
| 7 | `07-modal-back-fix` | Add `canGoBack` check, conditional Back/Close button |
| 8 | `08-universal-links-setup` | Add `associatedDomains` + `intentFilters` to `app.json` |
| 9 | `09-scheme-trap-demo` | Show hardcoded scheme vs `Linking.createURL()` side-by-side |
| 10 | `10-testing-checklist` | Add `TESTING.md`, update README with branch index |

## Branch Details

### 01-base-setup

Create Expo SDK 55 app. Set up file-based routing with two tabs (Home, Explore) and a product modal. Home screen shows app info and example deep link URLs. Scheme set to `deeplinkdemo` in `app.json`.

### 02-killed-app-bug

Root `_layout.tsx` is a plain `<Stack>` with no `getInitialURL` interception. When the app is killed and a deep link fires, the URL is consumed before the navigator mounts — app lands on Home.

### 03-killed-app-fix

Add manual `Linking.getInitialURL()` consumption in root layout, gated behind an `isReady` ref set by `<Stack onReady>`. Add `Linking.addEventListener('url')` for foreground links.

### 04-unstable-settings-bug

Add `export const unstable_settings = {};` to `app/(tabs)/_layout.tsx`. Even empty, this breaks foreground and background deep links silently.

### 05-unstable-settings-fix

Remove the `unstable_settings` export entirely. Set `initialRouteName="index"` directly on the `<Tabs>` component.

### 06-modal-back-bug

Product modal (`app/product/[id].tsx`) only uses `router.back()`. When deep linked directly, the stack below is empty — back does nothing or crashes.

### 07-modal-back-fix

Add `canGoBack` check via `useNavigationState(state => state?.index > 0)`. Render "Back" when stack exists, "Close" when it doesn't. Close navigates via `router.replace('/(tabs)')`.

### 08-universal-links-setup

Add to `app.json`:
- iOS: `associatedDomains: ["applinks:yourdomain.com"]`
- Android: `intentFilters` with `autoVerify: true` for `https://yourdomain.com`

Home screen gets a note explaining AASA file requirements and Content-Type header.

### 09-scheme-trap-demo

Home screen displays two values side-by-side:
- Hardcoded: `deeplinkdemo://product/123`
- Dynamic: result of `Linking.createURL('/product/123')`

Shows they differ in Expo Go (`exp://...`) vs standalone builds.

### 10-testing-checklist

Add `TESTING.md` with the blog's pre-ship checklist and CLI commands for iOS (`npx uri-scheme`, `xcrun simctl`) and Android (`adb`). Update README with a branch index table linking to each branch with one-line descriptions.

## Styling

- `StyleSheet.create` throughout, no external libraries
- Clean white/light background, consistent padding
- Readable typography, section headers on each screen
- Each screen explains what it demonstrates

## Commit Convention

`<type>: <description>` referencing edge case number. Examples:
- `feat: scaffold base Expo Router app with tabs and product modal`
- `feat: add unstable_settings to reproduce edge case 2`
- `fix: remove unstable_settings, use initialRouteName on Tabs`

## What's NOT Included

- **No automated tests.** The blog is about manual deep link testing via CLI commands. `TESTING.md` covers the manual workflow.
- **No external styling libraries.**
- **No backend/server.** AASA file hosting is documented but not implemented.

## Post-Merge

After all branches merge to main:
- Branches are NOT deleted (readers reference them)
- Main contains the final complete app (equivalent to branch 10)
- README on main has the branch index table
