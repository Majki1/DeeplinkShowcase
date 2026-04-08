# Deep Link Showcase

A companion app for the blog post **"Expo Router Deep Linking: The Edge Cases Nobody Warns You About."**

Built with Expo SDK 54 and Expo Router.

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
