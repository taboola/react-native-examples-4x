# Taboola React Native Plugin 4.x - Sample App

This sample app demonstrates how to integrate **Taboola recommendations** into your React Native application using the **Taboola React Native Plugin 4.x**.

## Overview

The **Taboola React Native Plugin 4.x** introduces full support for the **React Native New Architecture** (TurboModules and Fabric) and provides a more robust, flexible API with separated data-fetching and UI rendering logic.

## What's New in 4.x

- ✅ **Full React Native New Architecture support** (TurboModules & Fabric)
- ✅ **Separated data fetching and UI rendering** for better control
- ✅ **Hook-based API** with `useCreateUnit`
- ✅ **Improved TypeScript support** and type safety
- ✅ **Better memory management** with explicit cleanup
- ✅ **Multiple units per screen** support

## Sample App Features

This sample app showcases:
- Multiple integration patterns (Feed, Widget, Classic Page)
- Custom click handling and organic content management
- Dark mode configuration
- Memory management best practices
- React Native New Architecture compatibility

## Prerequisites

Before running the sample app, make sure you have:

- **React Native development environment** set up ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- **Node.js** 22.13 or newer (React Native 0.88 requirement)
- **iOS**: Xcode 16 or newer (the iOS app uses Swift Package Manager, no CocoaPods)
- **Android**: Android Studio and SDK configured

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Navigate to the sample app directory
cd react-native-examples-4x

# Install npm dependencies
npm install

# Set up the iOS Swift packages (iOS only, once after cloning — the SwiftPM equivalent of `pod install`)
cd ios && npx react-native spm && cd ..
```

> **iOS uses Swift Package Manager (experimental in React Native 0.88).** Open `ios/TaboolaReactNative4XExampleApp.xcodeproj` (there is no `.xcworkspace`). `ios/Podfile` is an empty stub: the React Native CLI needs it to find the iOS project, so keep it. `@react-native-picker/picker` and `react-native-screens` don't ship a `Package.swift` yet, so this app keeps generated ones in `patches/`, applied automatically by `patch-package` on `npm install`. See React Native's [SwiftPM guide](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/spm/__docs__/spm-scripts.md).

### 2. Run the Sample App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

## Integration Documentation

For complete integration instructions, API reference, and configuration options, visit the **Taboola Dev Center**:

📚 **[React Native Plugin 4.x Documentation](https://developers.taboola.com/taboolasdk/docs/react-native-plugin)**

The documentation includes:
- Step-by-step integration guide
- API reference and configuration options
- GDPR/CCPA compliance
- Troubleshooting and best practices

## Migrating from 3.x?  

For a detailed migration guide, visit the **Taboola Dev Center**:

📚 **[Migration Documentation](https://developers.taboola.com/taboolasdk/docs/react-native-migration)**.

## Sample Features

The app includes several screens demonstrating different integration patterns:

### 🔥 **Feed Integration** (`TaboolaFeedScreen.tsx`)
- Endless scrolling feed implementation
- Multiple unit types on the same screen
- Content fetching and memory management

### 📄 **Classic Page** (`TBLClassicPageScreen.tsx`)
- Widget placements within content
- Page-level configuration examples

### 🎯 **Custom Click Handling** (`ShouldHandleOrganicClicksScreen.tsx`)
- Intercepting organic content clicks
- Custom navigation for internal content

### ⚙️ **Global Settings** (`GlobalSettingsScreen.tsx`)
- Dark mode configuration
- Extra properties and advanced options
- Dynamic placement configuration

## Key Files to Examine

| File | Purpose |
|------|---------|
| `src/screens/TaboolaFeedScreen.tsx` | Complete feed implementation with multiple units |
| `src/screens/TBLClassicPageScreen.tsx` | Widget integration within content |
| `src/screens/ShouldHandleOrganicClicksScreen.tsx` | Custom click handling patterns |
| `src/screens/GlobalSettingsScreen.tsx` | Configuration and settings examples |
| `src/App.tsx` | Application entry point and Taboola initialization |

## Support

- 📖 **Documentation**: [Taboola Developer Center](https://developers.taboola.com/taboolasdk/)
- 💬 **Support Forum**: [Ask questions and get help](https://sdk.taboola.com/taboolasdk/discuss)
- 📧 **Contact**: Reach out to your Taboola Account Manager

## License

This sample app is provided for demonstration purposes. See the [Taboola SDK License](https://developers.taboola.com/taboolasdk/docs/license) for SDK usage terms. 
