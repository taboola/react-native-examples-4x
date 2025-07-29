import { TBLPlacementType } from '@taboola/react-native-plugin-4x';
import { Platform } from 'react-native';

export const COLORS = {
  PRIMARY: '#3498db',
  SECONDARY: '#f8f8f8',
  BACKGROUND: '#fff',
  TEXT: '#333333',
  LIGHT_TEXT: '#666666',
  BORDER: '#e0e0e0',
  ITEM_BG: '#f9f9f9',
  TABOOLA_CONTAINER_BG: '#f5f5f5',
  DRAWER_BG: '#fff',
  SWITCH_THUMB_DISABLED: '#f4f3f4',
  // Global Settings specific colors
  RESET_BUTTON: '#e74c3c',
  APPLY_BUTTON: '#27ae60',
  SECTION_HEADER_BG: '#f8f9fa',
  PROPERTY_BORDER: '#f0f0f0',
  DISABLED_BG: '#f8f8f8',
  DISABLED_SWITCH_TRACK: '#d3d3d3',
  DISABLED_SWITCH_THUMB: '#e0e0e0',
  SWITCH_TRACK_FALSE: '#767577',
  SWITCH_TRACK_TRUE: '#81b0ff',
  SWITCH_THUMB_ACTIVE: '#f5dd4b',
  PREVIEW_BG: '#f8f9fa',
};

// Layout
export const LAYOUT = {
  DRAWER_WIDTH: 240,
  HEADER_HEIGHT: 60,
  PADDING: 16,
  ITEM_PADDING: 20,
  BORDER_RADIUS: 5,
  BORDER_WIDTH: 4,
  // Global Settings specific layout
  SECTION_MARGIN: 32,
  PROPERTY_MIN_HEIGHT: 50,
  INPUT_MARGIN: 16,
  PREVIEW_MARGIN: 16,
  APPLY_BUTTON_MARGIN: 32,
};

// Typography
export const TYPOGRAPHY = {
  SECTION_TITLE_SIZE: 18,
  INPUT_LABEL_SIZE: 16,
  PROPERTY_LABEL_SIZE: 14,
  PREVIEW_LABEL_SIZE: 14,
  RESET_BUTTON_SIZE: 12,
  APPLY_BUTTON_SIZE: 18,
  PLATFORM_LABEL_SIZE: 12,
  ARROW_SIZE: 12,
};

// Opacity values
export const OPACITY = {
  DISABLED: 0.6,
};

// Screen names
export const SCREENS = {
  HOME: 'Home',
  TABOOLA_FEED_AND_WIDGET: 'TaboolaFeedAndWidget',
  TBLClassicPage: 'TBLClassicPage',
  SHOULD_HANDLE_ORGANIC_CLICKS_SCREEN: 'ShouldHandleOrganicClicksScreen',
  GLOBAL_SETTINGS: 'GlobalSettings',
};

export const SCREEN_TITLES = {
  HOME: 'Home Screen',
  TABOOLA_FEED_AND_WIDGET: 'Taboola Feed And Widget Screen',
  TEMPLATE_JS: 'Template JS Screen',
  TBLClassicPage: 'TBLClassicPage screen',
  SHOULD_HANDLE_ORGANIC_CLICKS_SCREEN: 'Should Handle OC Screen',
  GLOBAL_SETTINGS: 'Global Settings Screen',
};

export const PLACEMENT_PARAMS = {
  DARK_MODE_1X2_WIDGET: {
    placement: 'Mid Article',
    mode: 'alternating-1x2-widget',
    placementType: TBLPlacementType.PAGE_MIDDLE,
  },
  FEED_WITHOUT_VIDEO: {
    placement: 'Feed without video',
    mode: 'thumbs-feed-01',
    placementType: TBLPlacementType.FEED,
  },
};

export enum PublisherName {
  SDK_TESTER_RND = 'sdk-tester-rnd',
}

export const PUBLISHERS_PROPERTY = {
  [PublisherName.SDK_TESTER_RND]: {
    PAGE_URL: 'https://www.example.com',
    PAGE_TYPE: 'article',
  },
} as const;

export const TABOOLA_SECTION_TITLE = 'Taboola Content';

// Property Keys
export const EXTRA_PROPERTY_KEYS = {
  // Common properties
  HIDE_SCROLLING_BARS: 'hideScrollingBars',
  KEEP_VIEW_ID: 'keepViewId',
  OMSDK: 'omsdk',
  CDNS: 'cdns',
  DEBUG_MODE_INSPECTABLE_WEBVIEW: 'debugModeInspectableWebView',
};

// Messages
export const MESSAGES = {
  HOME_WELCOME: 'Welcome to the Home Screen',
  HOME_INSTRUCTION: 'Open the drawer to navigate to other screens',
  TBL_CLASSIC_PAGE_WELCOME: 'TBLClassicPage Screen',
  TBL_CLASSIC_PAGE_INSTRUCTION: 'This is the TBLClassicPage screen content',
  ORGANIC_CLICKS_TEST: 'Organic Clicks Test',
  TABOOLA_HANDLE_ORGANIC_CLICKS: 'Taboola Handle Organic Clicks:',
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
  FETCH_CONTENT: 'Fetch Content',
  TEMPLATE_DISABLE_TRC_CACHE: 'Disable TRC Cache',
  TEMPLATE_KEY: 'Key',
  TEMPLATE_VALUE: 'Value',
  TEMPLATE_CAMPAIGN_ID: 'Campaign ID',
  TEMPLATE_GEO: 'Geo',
  TEMPLATE_TRC_SERVER: 'TRC Server',
  TEMPLATE_VIDEO_FORMAT: 'Video Format',
  TEMPLATE_APPLY_SETTINGS: 'Apply Settings & Fetch Content',
  TEMPLATE_TABOOLA_UNIT: 'Taboola Unit',
  TEMPLATE_ENTER_KEY: 'Enter key',
  TEMPLATE_ENTER_VALUE: 'Enter value',
  TEMPLATE_ENTER_CAMPAIGN_ID: 'Enter campaign ID',
  TEMPLATE_ENTER_GEO: 'Enter geo',
  TEMPLATE_ENTER_SERVER: 'Enter server name',
  TEMPLATE_ENTER_FORMAT: 'Enter format',
  LOG_LEVEL: 'Log Level',
  EXTRA_PROPERTIES: 'Extra Properties',
  PROPERTY_KEY: 'Property Key',
  PROPERTY_VALUE: 'Property Value',
  APPLY_SETTINGS: 'Apply Settings',
  CUSTOM_EXTRA_PROPERTY: 'Custom Extra Property',
  COMMON_PROPERTIES: 'Common Properties (iOS & Android)',
  IOS_PROPERTIES: 'iOS Properties',
  PREVIEW: 'Preview:',
  SELECT_LOG_LEVEL: 'Select Log Level',
  CANCEL: 'Cancel',
  SUCCESS: 'Success',
  ERROR: 'Error',
  SETTINGS_APPLIED_SUCCESS: 'Settings applied successfully!',
  SETTINGS_APPLY_ERROR: 'Failed to apply settings',
  APPLIED_LOG_LEVEL: 'Applied log level:',
  APPLIED_EXTRA_PROPERTIES: 'Applied extra properties:',
  SETTINGS_APPLICATION_ERROR: 'Settings application error:',
  CUSTOM_PROPERTY_LABEL: 'Custom Property:',
  COMMON_PROPERTIES_LABEL: 'Common Properties:',
  IOS_PROPERTIES_LABEL: 'iOS Properties:',
  LOG_LEVEL_LABEL: 'Log Level:',
  PICKER_DROPDOWN_COLOR: '#666',
  DROPDOWN_ARROW: '▼',
};

export const EXTRA_PROPERTY_LABELS = {
  HIDE_SCROLLING_BARS: 'Hide Scrolling Bars',
  KEEP_VIEW_ID: 'Keep View ID',
  OMSDK: 'OMSDK',
  CDNS: 'CDNs',
  CCPA_PRIVACY_STRING: 'CCPA Privacy String',
  ENABLE_GDPR1: 'Enable GDPR1',
  ENABLE_GDPR2: 'Enable GDPR2',
  DEBUG_MODE_INSPECTABLE_WEBVIEW: 'Debug Mode Inspectable WebView',
};

export const DUMMY_CONTENT = {
  ITEM_1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ITEM_2: 'Curabitur ac gravida purus. Donec non elit ultrices eros.',
  ITEM_3: '',
  ITEM_4: 'Fusce accumsan tincidunt purus nec tempus.',
  ITEM_5: 'Vestibulum eu viverra ligula. Nunc lectus erat, auctor sed metus.',
};

export const isIOS = (): boolean => Platform.OS === 'ios';

// Property Types
export const PROPERTY_TYPES = {
  COMMON: 'common',
  IOS: 'ios',
} as const;
