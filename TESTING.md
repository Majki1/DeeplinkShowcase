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
