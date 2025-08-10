# Taboola React Native Plugin 4x

Taboola is a content discovery platform that helps publishers monetize their content through native advertising and content recommendations. This React Native plugin enables developers to easily integrate Taboola's content recommendation widgets into their mobile applications, providing personalized content suggestions that blend seamlessly with the app's design.

This is a React Native plugin for integrating Taboola content recommendations into your mobile application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Platform Setup](#platform-setup)
  - [Android](#android)
  - [iOS](#ios)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Complete Example](#complete-example)
- [Configuration Options](#configuration-options)
- [Event Handling](#event-handling)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- React Native >= `0.80.1`
- iOS >= `12.0`
- Android API level >= `24`
- Node.js for development
- Taboola publisher account

## Installation

### Using npm
```sh
npm i @taboola/react-native-plugin-4x
```

### Using yarn
```sh
yarn add @taboola/react-native-plugin-4x
```

## Platform Setup

### Android

1. Add the Taboola repository to your `android/settings.gradle`:

```gradle
dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
  repositories {
    google()
    mavenCentral()
    maven {
      // Taboola repository for mobile SDK
      url 'https://taboolapublic.jfrog.io/artifactory/mobile-release'
    }
  }
}
```

2. Add required permissions to your `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```


### iOS

1. Install iOS dependencies:
```sh

cd ios && pod install
```
## Getting Started

### Step 1: Initialize Taboola

Initialize Taboola as early as possible in your app lifecycle. Add this to your main entry point (`index.js` or `index.ts`):

```javascript
import { Taboola } from '@taboola/react-native-plugin-4x';

// Initialize with your publisher name (provided by Taboola)
Taboola.init("your-publisher-name");
```

> **Important**: Initialization should be done as soon as possible, preferably in your application entry-point.

### Step 2: Import Required Components

```javascript
import {
  Taboola,
  TBLClassicUnit,
  TBLPlacementType,
  type TBLClassicListener,
  useCreateUnit,
} from '@taboola/react-native-plugin-4x';
```

### Step 3: Create a Page Instance

TBLClassicPage represents a screen on the app, every screen should have only one TBLClassicPage instance.

Use the `useMemo` hook to create a Taboola Page to prevent memory leaks:

```javascript
import { useMemo } from 'react';

const tblClassicPage = useMemo(
        () =>
                Taboola.getClassicPage(
                        "https://your-page-url.com", // Fully-qualified public URL
                        "article" // Page type provided by Taboola
                ),
        []
);
```

### Step 4: Set Up Event Listeners
In order to get data on a TBLClassicUnit—for example, the lifecycle or user interaction—we need to create a TBLClassicListener instance and pass it to TBLClassicUnitController.

```javascript
const classicListeners: TBLClassicListener = {
  onResize(height: number) {
    console.log('[TBLClassicListener] onResize: ', { height });
  },
  onEvent(actionType: number, data: string) {
    console.log('[TBLClassicListener] onEvent: ', { actionType, data });
  },
  onAdReceiveFail(error: string) {
    console.log('[TBLClassicListener] onAdReceiveFail: ', { error });
    // Handle error - show fallback content or retry loading
  },
  onAdReceiveSuccess() {
    console.log('[TBLClassicListener] onAdReceiveSuccess');
  },
  onItemClick(
    placementName: string,
    itemId: string,
    clickUrl: string,
    isOrganic: boolean,
    customData?: string | null
  ) {
    console.log('[TBLClassicListener] onItemClick: ', {
      placementName,
      itemId,
      clickUrl,
      isOrganic,
      customData,
      timestamp,
    });
    // Handle click - by default SDK handles non-organic clicks
  },
  onTaboolaWidgetOnTop() {
    console.log('[TBLClassicListener] onTaboolaWidgetOnTop');
  },
  onUpdateContentCompleted() {
    console.log('[TBLClassicListener] onUpdateContentCompleted');
  },
};
```

### Step 5: Create Unit Controller

TBLClassicUnitController is the TBLClassicUnit controller. Every JSX <TBLClassicUnit /> has to be linked with its own TBLClassicUnitController.


```javascript
const { tblClassicUnitController } = useCreateUnit({
  tblClassicPage,
  placement: 'Mid Article', 
  mode: 'alternating-1x2-widget',
  placementType: TBLPlacementType.PAGE_MIDDLE,
  tblClassicListener: classicListeners,
});
```

### Step 6: Fetch Content

To get Taboola content, tblClassicUnitController.fetchContent() has to be called.

```javascript
import { useEffect } from 'react';
 

useEffect(() => {
  if (tblClassicUnitController) {
    tblClassicUnitController.fetchContent();
  }
}, [tblClassicUnitController]);
```

### Step 7: Render the Taboola Unit
As already explained, every <TBLClassicUnit /> has to be linked with its own controller.  <TBLClassicUnit />  is just a container and responsible for displaying the Widget/Feed.
```javascript
return (
  <TBLClassicUnit
    tblClassicPage={tblClassicPage}
    tblClassicUnitController={tblClassicUnitController}
  />
);
```

### Step 8: Cleanup (Important for Memory Management)

```javascript
useEffect(() => {
  return () => {
    // Clear page from memory when component unmounts
    if (tblClassicPage) {
      Taboola.removeClassicPage(tblClassicPage.pageId);
    }
  };
}, [tblClassicPage]);
```

## API Reference

### Taboola

#### `Taboola.init(publisherName: string)`
Initializes the Taboola SDK with your publisher name (provided by Taboola).

#### `Taboola.getClassicPage(pageUrl: string, pageType: string)`
Creates a classic page instance for each screen.

**Parameters:**
- `pageUrl`: Fully-qualified public URL with same content as current screen
- `pageType`: Page type provided by Taboola (e.g., "article")

### TBLPlacementType

Available placement types:
- `TBLPlacementType.PAGE_MIDDLE` - Middle of page content (widgets)
- `TBLPlacementType.PAGE_BOTTOM` - Bottom of page content (widgets)
- `TBLPlacementType.FEED` - Feed-style placement (continuous scroll)

### useCreateUnit Hook

**Parameters:**
- `tblClassicPage: TBLClassicPage` - The page instance created with `Taboola.getClassicPage()`
- `placement: string` - Placement name exactly as configured in Taboola dashboard
- `mode: string` - Widget mode as configured in Taboola dashboard
- `placementType: number` - Type of placement (from TBLPlacementType enum)
- `tblClassicListener: TBLClassicListener` - Event listener interface for handling widget events

**Returns:**
- `{ tblClassicUnitController: TBLClassicUnitController | null }` - Controller for managing the widget lifecycle

### TBLClassicListener Interface

#### Event Methods:

- **`onItemClick(placementName, itemId, clickUrl, isOrganic, customData?)`** - Triggered when user clicks on a recommendation item
- **`onResize(height)`** - Called when widget resizes to fit content (height in pixels)
- **`onAdReceiveSuccess()`** - Called when widget successfully receives content
- **`onAdReceiveFail(error)`** - Called when widget fails to receive content
- **`onTaboolaWidgetOnTop()`** - Called when internal scrolling reaches widget top
- **`onUpdateContentCompleted()`** - Called after content update is completed
- **`onEvent(actionType, data)`** - General event callback for custom tracking (consult Taboola for event types)

## Complete Example

```javascript
import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Taboola,
  TBLClassicUnit,
  TBLPlacementType,
  type TBLClassicListener,
  useCreateUnit,
} from '@taboola/react-native-plugin-4x';

const TaboolaWidget = () => {
  // Create page instance (use useMemo to prevent memory leaks)
  const tblClassicPage = useMemo(() =>
    Taboola.getClassicPage(
      "https://example.com/article?id=123",
      "article"
    ), []
  );

  // Set up event listeners
  const classicListeners: TBLClassicListener = {
    onResize(height: number) {
      console.log('[TBLClassicListener] onResize: ', { height });
    },
    onEvent(actionType: number, data: string) {
      console.log('[TBLClassicListener] onEvent: ', { actionType, data });
    },
    onAdReceiveFail(error: string) {
      console.error('[TBLClassicListener] onAdReceiveFail: ', { error });
      // Implement retry logic or show fallback content
    },
    onAdReceiveSuccess() {
      console.log('[TBLClassicListener] onAdReceiveSuccess');
    },
    onItemClick(
      placementName: string,
      itemId: string,
      clickUrl: string,
      isOrganic: boolean,
      customData?: string | null
    ) {
      console.log('[TBLClassicListener] onItemClick: ', {
        placementName,
        itemId,
        clickUrl,
        isOrganic,
        customData,
        timestamp: new Date().toISOString(),
      });
    },
    onTaboolaWidgetOnTop() {
      console.log('[TBLClassicListener] onTaboolaWidgetOnTop');
    },
    onUpdateContentCompleted() {
      console.log('[TBLClassicListener] onUpdateContentCompleted');
    },
  };

  // Create unit controller
  const { tblClassicUnitController } = useCreateUnit({
    tblClassicPage,
    placement: 'Mid Article',
    mode: 'alternating-1x2-widget',
    placementType: TBLPlacementType.PAGE_MIDDLE,
    tblClassicListener: classicListeners,
  });

  // Fetch content when controller is ready
  useEffect(() => {
    if (tblClassicUnitController) {
      tblClassicUnitController.fetchContent();
    }
  }, [tblClassicUnitController]);

  // Cleanup on unmount (important for memory management)
  useEffect(() => {
    return () => {
      if (tblClassicPage) {
        Taboola.removeClassicPage(tblClassicPage.pageId);
      }
    };
  }, [tblClassicPage]);

  return (
    <View style={{ flex: 1 }}>
      <TBLClassicUnit
        tblClassicPage={tblClassicPage}
        tblClassicUnitController={tblClassicUnitController}
      />
    </View>
  );
};

export default TaboolaWidget;
```

## Configuration Options


### Extra Properties
Configure additional widget behavior using `setPageExtraProperties()`:

```javascript
// Dark mode support (requires Taboola configuration)
if (isDarkMode) {
  tblClassicPage.setPageExtraProperties({ darkMode: 'true' });
}

// For tabbed interfaces
tblClassicPage.setPageExtraProperties({ keepDependencies: 'true' });

// Enable horizontal scroll in feeds
tblClassicPage.setPageExtraProperties({ enableHorizontalScroll: 'true' });
```

### Click Handling
Control how organic (non-sponsored) content clicks are handled:

```javascript
// To handle organic clicks manually, add to your unit props:
<TBLClassicUnit
  tblClassicPage={tblClassicPage}
  tblClassicUnitController={tblClassicUnitController}
  taboolaHandleOrganicClick={false} // Prevents SDK from handling organic clicks
/>
```

## Event Handling

### Available Events

**Content Lifecycle:**
- `onAdReceiveSuccess` - Content loaded successfully
- `onAdReceiveFail` - Content failed to load (network issues, no content available)
- `onUpdateContentCompleted` - Content refresh completed

**User Interactions:**
- `onItemClick` - User tapped on a recommendation (provides itemId, clickUrl, isOrganic)
- `onTaboolaWidgetOnTop` - Internal scrolling reached top of widget

**Layout Changes:**
- `onResize` - Widget height changed to accommodate content

**Custom Tracking:**
- `onEvent` - Generic event for custom analytics (actionType and data provided)

### Event Data
The `onItemClick` event provides comprehensive information:
- `placementName`: Name of the placement clicked
- `itemId`: Unique identifier for the clicked item
- `clickUrl`: Destination URL for the content
- `isOrganic`: Boolean indicating if content is organic (true) or sponsored (false)
- `customData`: Additional data from Taboola servers (may be null)

## Performance Considerations

### Best Practices
- **Early Initialization**: Call `Taboola.init()` as early as possible in your app lifecycle
- **Memory Management**: Always call `Taboola.removePage(pageId)` when components unmount
- **Use useMemo**: Create page instances with `useMemo` to prevent memory leaks
- **Appropriate Placement Types**: Choose correct placement type for your content layout


### Debug Mode

Enable debug logging for troubleshooting:
```javascript
import { Taboola, TBLLogLevel } from '@taboola/react-native-plugin-4x';

// Set log level before initialization
Taboola.setLogLevel(TBLLogLevel.DEBUG);
Taboola.init("your-publisher-name");
```

Available log levels:
- `TBLLogLevel.VERBOSE` - Most detailed logging
- `TBLLogLevel.DEBUG` - Debug information
- `TBLLogLevel.INFO` - General information
- `TBLLogLevel.WARNING` - Warning messages
- `TBLLogLevel.ERROR` - Error messages only




---

**Note:** This plugin requires a Taboola publisher account. Contact [Taboola Support](https://help.taboola.com/) or visit [Taboola.com](https://www.taboola.com/) for more information about becoming a Taboola publisher.

For technical questions, visit the [Taboola Support Forum](https://developers.taboola.com/support-forum).
