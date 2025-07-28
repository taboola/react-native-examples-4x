import {
  Taboola,
  TBLClassicUnit,
  type TBLClassicListener,
} from '@taboola/react-native-plugin-4x';
import { useState, useCallback } from 'react';
import { ScrollView, Text, View, Button, Alert, Platform } from 'react-native';
import baseStyles from '../styles/baseStyles';
import {
  MESSAGES,
  PLACEMENT_PARAMS,
  PublisherName,
  PUBLISHERS_PROPERTY,
  COLORS,
} from '../utils/constants';
import { styles } from '../styles/TemplateJsScreen.styles';
import { useTaboolaApiState } from '../hooks/useTaboolaApiState';
import { TaboolaSettingsForm } from '../components/TaboolaSettingsForm';
import { useTaboolaCleanup } from '../hooks/useTaboolaCleanup';


const SDK_TESTER_PUBLISHER = PUBLISHERS_PROPERTY[PublisherName.SDK_TESTER_RND];

const TBLClassicPageScreen = () => {
  const [tblClassicPage] = useState(() =>
    Taboola.getClassicPage(
      SDK_TESTER_PUBLISHER.PAGE_URL,
      SDK_TESTER_PUBLISHER.PAGE_TYPE
    )
  );

  // Unit controller state
  const [tblClassicUnitController, setTblClassicUnitController] = useState<
    any | undefined
  >(undefined);
  const [showUnit, setShowUnit] = useState(false);

  // Use the custom hook for ALL Taboola API state - no duplicate state!
  const [taboolaState, taboolaActions] = useTaboolaApiState();

  useTaboolaCleanup(tblClassicPage);

  const applyPageSettings = useCallback(() => {
    // Single platform check for all Android-only methods
    if (Platform.OS === 'android') {
      if (taboolaState.publisher) {
        tblClassicPage.setPublisher(taboolaState.publisher);
        console.log('Applied publisher:', taboolaState.publisher);
      }

      if (taboolaState.pageType) {
        tblClassicPage.setPageType(taboolaState.pageType);
        console.log('Applied pageType:', taboolaState.pageType);
      }

      if (taboolaState.targetType) {
        tblClassicPage.setTargetType(taboolaState.targetType);
        console.log('Applied targetType:', taboolaState.targetType);
      }

      if (taboolaState.pageUrl) {
        tblClassicPage.setPageUrl(taboolaState.pageUrl);
        console.log('Applied pageUrl:', taboolaState.pageUrl);
      }
    }

    // Common methods (available on both platforms)
    if (taboolaState.serialFetchTimeout) {
      const timeout = parseInt(taboolaState.serialFetchTimeout, 10);
      if (!isNaN(timeout)) {
        tblClassicPage.setSerialFetchTimeout(timeout);
        console.log('Applied serialFetchTimeout:', timeout);
      }
    }

    if (taboolaState.extraPropertiesKey && taboolaState.extraPropertiesValue) {
      const extraProperties = {
        [taboolaState.extraPropertiesKey]: taboolaState.extraPropertiesValue,
      };
      tblClassicPage.setPageExtraProperties(extraProperties);
      console.log('Applied extraProperties:', extraProperties);
    }
  }, [tblClassicPage, taboolaState]);

  const createUnit = useCallback(async () => {
    try {
      const { placement, mode, placementType } =
        PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET;

      console.log('Creating unit with params:', {
        placement,
        mode,
        placementType,
      });

      const createdUnit = await tblClassicPage.buildUnit(
        placement,
        mode,
        placementType,
        classicListener
      );

      setTblClassicUnitController(createdUnit);
      Alert.alert('Success', 'Unit created successfully');
      console.log('Unit created successfully:', createdUnit);
    } catch (error) {
      Alert.alert('Error', `Failed to create unit: ${error}`);
      console.error('Failed to create unit:', error);
    }
  }, [tblClassicPage]);


  const fetchContent = useCallback(() => {
    if (!tblClassicUnitController) {
      Alert.alert('Error', 'Unit controller not available yet');
      return;
    }

    tblClassicUnitController.fetchContent();
    setShowUnit(true);
  }, [tblClassicUnitController]);

  return (
    <View style={baseStyles.flex}>
      <ScrollView
        removeClippedSubviews={false}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: 50 }]}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>{MESSAGES.TBL_CLASSIC_PAGE_WELCOME}</Text>

        <TaboolaSettingsForm
          state={taboolaState}
          actions={taboolaActions}
          showPageSettings={true}
        />

        {/* Action Buttons Section */}
        <View style={{ marginTop: 30 }}>
          <Text
            style={[styles.sectionTitle, { fontSize: 18, fontWeight: 'bold' }]}
          >
            Actions
          </Text>

          {/* Step 1: Apply Page Settings */}
          <View style={styles.buttonContainer}>
            <Button
              title="1. Apply Page Settings"
              onPress={applyPageSettings}
              color={COLORS.PRIMARY}
            />
          </View>

          {/* Step 2: Create Unit */}
          <View style={styles.buttonContainer}>
            <Button
              title="2. Create Unit"
              onPress={createUnit}
              color="#e74c3c"
              disabled={!!tblClassicUnitController}
            />
          </View>


          {/* Step 4: Fetch Content */}
          {tblClassicUnitController && (
            <View style={styles.buttonContainer}>
              <Button
                title="3. Fetch Content"
                onPress={fetchContent}
                color="#27ae60"
              />
            </View>
          )}

          {/* Platform and Status indicator */}
          <View
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: '#f8f9fa',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              Platform: {Platform.OS}
            </Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Status:</Text>
            <Text>
              Unit Created: {tblClassicUnitController ? '✅ Yes' : '❌ No'}
            </Text>
            <Text>Content Loaded: {showUnit ? '✅ Yes' : '❌ No'}</Text>
          </View>
        </View>

        {/* Unit Display */}
        {showUnit && tblClassicUnitController && (
          <View style={styles.unitContainer}>
            <Text style={styles.sectionTitle}>Taboola Unit</Text>
            <TBLClassicUnit
              tblClassicPage={tblClassicPage}
              tblClassicUnitController={tblClassicUnitController}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const classicListener: TBLClassicListener = {
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

export default TBLClassicPageScreen;
