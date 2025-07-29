import {
  Taboola,
  type TBLClassicListener,
  TBLClassicUnit,
  useCreateUnit,
} from '@taboola/react-native-plugin-4x';
import { useMemo, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import baseStyles from '../styles/baseStyles';
import { type FlatListItem, FlatListItemType } from '../types';
import {
  COLORS,
  DUMMY_CONTENT,
  LAYOUT,
  PLACEMENT_PARAMS,
  PublisherName,
  PUBLISHERS_PROPERTY,
  TABOOLA_SECTION_TITLE,
} from '../utils/constants';
import { TaboolaUnitSettingsForm } from '../components/TaboolaUnitSettingsForm.tsx';
import { useTaboolaCleanup } from '../hooks/useTaboolaCleanup';
import {PLATFORMS} from "../platfroms.ts";

const SDK_TESTER_PUBLISHER = PUBLISHERS_PROPERTY[PublisherName.SDK_TESTER_RND];

/**
 * TaboolaFeedScreen - React Native screen component that demonstrates combined Widget and Feed integration
 */
function TaboolaFeedScreen() {
  const [tblClassicPage] = useState(() =>
    Taboola.getClassicPage(
      SDK_TESTER_PUBLISHER.PAGE_URL,
      SDK_TESTER_PUBLISHER.PAGE_TYPE
    )
  );

  // Widget and Feed units
  const { tblClassicUnitController: widgetUnit } = useCreateUnit({
    tblClassicPage,
    ...PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET,
    tblClassicListener: classicListeners,
  });

  const { tblClassicUnitController: feedUnit } = useCreateUnit({
    tblClassicPage,
    ...PLACEMENT_PARAMS.FEED_WITHOUT_VIDEO,
    tblClassicListener: classicListeners,
  });

  const [widgetPublisher, setWidgetPublisher] = useState('');
  const [widgetPageType, setWidgetPageType] = useState('');
  const [widgetTargetType, setWidgetTargetType] = useState('');
  const [widgetPageUrl, setWidgetPageUrl] = useState('');
  const [widgetExtraPropertiesKey, setWidgetExtraPropertiesKey] = useState('');
  const [widgetExtraPropertiesValue, setWidgetExtraPropertiesValue] =
    useState('');

  const [feedPublisher, setFeedPublisher] = useState('');
  const [feedPageType, setFeedPageType] = useState('');
  const [feedTargetType, setFeedTargetType] = useState('');
  const [feedPageUrl, setFeedPageUrl] = useState('');
  const [feedExtraPropertiesKey, setFeedExtraPropertiesKey] = useState('');
  const [feedExtraPropertiesValue, setFeedExtraPropertiesValue] = useState('');

  // Auto cleanup on unmount
  useTaboolaCleanup(tblClassicPage);

  // Memoize the list items to prevent unnecessary recalculations
  const listItems = useMemo(() => generateDummyItems(), []);

  // TBLClassicUnitController API methods for Widget
  const applyWidgetSettings = useCallback(() => {
    if (!widgetUnit) {
      Alert.alert('Error', 'Widget unit not available');
      return;
    }
    // Single platform check for all Android-only methods
    if (Platform.OS === PLATFORMS.ANDROID) {
      if (widgetPublisher) {
        widgetUnit.setPublisherName(widgetPublisher);
      }
      if (widgetPageType) {
        widgetUnit.setPageType(widgetPageType);
      }

      if (widgetTargetType) {
        widgetUnit.setTargetType(widgetTargetType);
      }

      if (widgetPageUrl) {
        widgetUnit.setPageUrl(widgetPageUrl);
      }
    }

    // Common methods (available on both platforms)
    if (widgetExtraPropertiesKey && widgetExtraPropertiesValue) {
      const extraProperties = {
        [widgetExtraPropertiesKey]: widgetExtraPropertiesValue,
      };
      widgetUnit.setUnitExtraProperties(extraProperties);
    }
  }, [
    widgetUnit,
    widgetPublisher,
    widgetPageType,
    widgetTargetType,
    widgetPageUrl,
    widgetExtraPropertiesKey,
    widgetExtraPropertiesValue,
  ]);

  // TBLClassicUnitController API methods for Feed
  const applyFeedSettings = useCallback(() => {
    if (!feedUnit) {
      Alert.alert('Error', 'Feed unit not available');
      return;
    }

    // Single platform check for all Android-only methods
    if (Platform.OS === PLATFORMS.ANDROID) {
      if (feedPublisher) {
        feedUnit.setPublisherName(feedPublisher);
      }

      if (feedPageType) {
        feedUnit.setPageType(feedPageType);
      }

      if (feedTargetType) {
        feedUnit.setTargetType(feedTargetType);
      }

      if (feedPageUrl) {
        feedUnit.setPageUrl(feedPageUrl);
      }
    }

    // Common methods (available on both platforms)
    if (feedExtraPropertiesKey && feedExtraPropertiesValue) {
      const extraProperties = {
        [feedExtraPropertiesKey]: feedExtraPropertiesValue,
      };
      feedUnit.setUnitExtraProperties(extraProperties);
    }
  }, [
    feedUnit,
    feedPublisher,
    feedPageType,
    feedTargetType,
    feedPageUrl,
    feedExtraPropertiesKey,
    feedExtraPropertiesValue,
  ]);

  // Create unit state objects for the reusable component
  const widgetUnitState = {
    publisher: widgetPublisher,
    pageType: widgetPageType,
    targetType: widgetTargetType,
    pageUrl: widgetPageUrl,
    extraPropertiesKey: widgetExtraPropertiesKey,
    extraPropertiesValue: widgetExtraPropertiesValue,
  };

  const widgetUnitActions = {
    setPublisher: setWidgetPublisher,
    setPageType: setWidgetPageType,
    setTargetType: setWidgetTargetType,
    setPageUrl: setWidgetPageUrl,
    setExtraPropertiesKey: setWidgetExtraPropertiesKey,
    setExtraPropertiesValue: setWidgetExtraPropertiesValue,
  };

  const feedUnitState = {
    publisher: feedPublisher,
    pageType: feedPageType,
    targetType: feedTargetType,
    pageUrl: feedPageUrl,
    extraPropertiesKey: feedExtraPropertiesKey,
    extraPropertiesValue: feedExtraPropertiesValue,
  };

  const feedUnitActions = {
    setPublisher: setFeedPublisher,
    setPageType: setFeedPageType,
    setTargetType: setFeedTargetType,
    setPageUrl: setFeedPageUrl,
    setExtraPropertiesKey: setFeedExtraPropertiesKey,
    setExtraPropertiesValue: setFeedExtraPropertiesValue,
  };

  const renderControlButtons = () => (
    <View style={styles.controlContainer}>
      <Text style={styles.controlTitle}>TBLClassicPage API Controls</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => tblClassicPage.reset()}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => tblClassicPage.fetchAllUnitsContent()}
        >
          <Text style={styles.buttonText}>Fetch All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => tblClassicPage.refresh()}
        >
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Platform and Status indicator */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Platform: {Platform.OS}</Text>
        <Text style={styles.statusText}>
          Widget Unit: {widgetUnit ? '✅ Available' : '❌ Not Available'}
        </Text>
        <Text style={styles.statusText}>
          Feed Unit: {feedUnit ? '✅ Available' : '❌ Not Available'}
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: FlatListItem }) => {
    if (item.type === FlatListItemType.TaboolaWidget) {
      return (
        <View style={styles.taboolaContainer}>
          <Text style={styles.sectionTitle}>
            {TABOOLA_SECTION_TITLE} - Widget
          </Text>
          <TBLClassicUnit
            tblClassicPage={tblClassicPage}
            tblClassicUnitController={widgetUnit}
          />
        </View>
      );
    } else if (item.type === FlatListItemType.TaboolaFeed) {
      return (
        <View style={styles.taboolaContainer}>
          <Text style={styles.sectionTitle}>
            {TABOOLA_SECTION_TITLE} - Feed
          </Text>
          <TBLClassicUnit
            tblClassicPage={tblClassicPage}
            tblClassicUnitController={feedUnit}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={baseStyles.flex}>
      <ScrollView style={baseStyles.flex}>
        {renderControlButtons()}
        <TaboolaUnitSettingsForm
          title="Widget Unit Controls"
          state={widgetUnitState}
          actions={widgetUnitActions}
          onApplySettings={applyWidgetSettings}
          onFetchContent={() => widgetUnit?.fetchContent()}
          onRefresh={() => widgetUnit?.refresh()}
          onReset={() => widgetUnit?.reset()}
        />
        Feed Unit Controls
        <TaboolaUnitSettingsForm
          title="Feed Unit Controls"
          state={feedUnitState}
          actions={feedUnitActions}
          onApplySettings={applyFeedSettings}
          onFetchContent={() => feedUnit?.fetchContent()}
          onRefresh={() => feedUnit?.refresh()}
          onReset={() => feedUnit?.reset()}
        />
        <FlatList
          data={listItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const classicListeners: TBLClassicListener = {
  onResize(height: number) {
    console.log('[TBLClassicListener] onResize: ', { height });
  },
  onEvent(actionType: number, data: string) {
    console.log('[TBLClassicListener] onEvent: ', { actionType, data });
  },
  onAdReceiveFail(error: string) {
    console.log('[TBLClassicListener] onAdReceiveFail: ', { error });
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
    });
  },
  onTaboolaWidgetOnTop() {
    console.log('[TBLClassicListener] onTaboolaWidgetOnTop');
  },
  onUpdateContentCompleted() {
    console.log('[TBLClassicListener] onUpdateContentCompleted');
  },
};

export const generateDummyItems = (): FlatListItem[] => {
  const WIDGET_POSITION = 50;
  const LIST_LENGTH = 100;
  const items: FlatListItem[] = [];

  // Generate content items with widget in the middle
  for (let i = 1; i <= LIST_LENGTH; i++) {
    // Insert widget at position 50
    if (i === WIDGET_POSITION) {
      items.push({
        id: 'widget-middle',
        type: FlatListItemType.TaboolaWidget,
        text: 'Taboola Widget',
      });
    }

    // Add regular content item
    items.push({
      id: i.toString(),
      type: FlatListItemType.NativePublisherContent,
      text: `${DUMMY_CONTENT.ITEM_1} (Item ${i})`,
    });
  }

  // Add Taboola feed as the last item
  items.push({
    id: 'feed-bottom',
    type: FlatListItemType.TaboolaFeed,
    text: DUMMY_CONTENT.ITEM_3,
  });

  return items;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.ITEM_BG,
    padding: LAYOUT.ITEM_PADDING,
    marginVertical: 8,
    borderRadius: LAYOUT.BORDER_RADIUS,
    borderLeftWidth: LAYOUT.BORDER_WIDTH,
    borderLeftColor: COLORS.PRIMARY,
  },
  itemText: {
    ...baseStyles.text,
    color: COLORS.TEXT,
  },
  taboolaContainer: {
    marginVertical: 16,
    padding: 10,
    backgroundColor: COLORS.TABOOLA_CONTAINER_BG,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
  sectionTitle: {
    ...baseStyles.title,
    marginBottom: 10,
  },
  controlContainer: {
    backgroundColor: COLORS.BACKGROUND,
    padding: LAYOUT.PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  controlTitle: {
    ...baseStyles.subtitle,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: LAYOUT.BORDER_RADIUS,
    minWidth: 80,
  },
  buttonText: {
    color: COLORS.BACKGROUND,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  statusContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statusText: {
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 12,
  },
});

export default TaboolaFeedScreen;
