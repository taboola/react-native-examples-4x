import {
  Taboola,
  type TBLClassicListener,
  TBLClassicUnit,
  useCreateUnit,
} from '@taboola/react-native-plugin-4x';
import { useState, useCallback, useMemo } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { OrganicClicksControls } from '../components/OrganicClicksControls';
import {
  PLACEMENT_PARAMS,
  PublisherName,
  PUBLISHERS_PROPERTY,
  TABOOLA_SECTION_TITLE,
} from '../utils/constants';
import { styles } from '../styles/ShouldHandleOrganicClicksScreen.styles';
import { useTaboolaCleanup } from '../hooks/useTaboolaCleanup';


const SDK_TESTER_PUBLISHER = PUBLISHERS_PROPERTY[PublisherName.SDK_TESTER_RND];

/**
 * Screen demonstrating organic clicks handling control.
 * Publishers can toggle organic clicks handling by calling:
 * tblClassicUnitController?.setShouldHandleOrganicClicks(boolean)
 * 
 * Taboola Integration Steps:
 * 1. Create TBLClassicPage with Taboola.getClassicPage(pageUrl, pageType)
 * 2. Create unit controller using useCreateUnit hook with page + placement params
 *    - TBLClassicUnitController preloads ad content in background
 * 3. Render TBLClassicUnit component with page and controller
 *    - JSX connects the preloaded unit data to the UI display
 * 4. Use controller methods to manage content and behavior
 */
function ShouldHandleOrganicClicksScreen() {
  const [shouldHandleOrganicClicks, setShouldHandleOrganicClicks] =
    useState(true);

  // Step 1: Create TBLClassicPage
  const tblClassicPage = useMemo(
    () =>
      Taboola.getClassicPage(
        SDK_TESTER_PUBLISHER.PAGE_URL,
        SDK_TESTER_PUBLISHER.PAGE_TYPE
      ),
    []
  );
  useTaboolaCleanup(tblClassicPage)

  // Step 2: Create unit controller
  const { tblClassicUnitController } = useCreateUnit({
    tblClassicPage,
    ...PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET,
    tblClassicListener: classicListeners,
  });

  // Step 4: Use controller methods
  const handleOrganicClicksToggle = useCallback(() => {
    setShouldHandleOrganicClicks((prevState) => {
      const updatedState = !prevState;
      tblClassicUnitController?.setShouldHandleOrganicClicks(updatedState);
      return updatedState;
    });
  }, [tblClassicUnitController]);

  const handleFetchContent = useCallback(() => {
    tblClassicUnitController?.fetchContent();
  }, [tblClassicUnitController]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <OrganicClicksControls
          shouldHandleOrganicClicks={shouldHandleOrganicClicks}
          onToggle={handleOrganicClicksToggle}
          onFetchContent={handleFetchContent}
        />

        <View style={styles.taboolaContainer}>
          <Text style={styles.sectionTitle}>
            {TABOOLA_SECTION_TITLE} - Test Unit
          </Text>
          {/* Step 3: Render TBLClassicUnit */}
          <TBLClassicUnit
            tblClassicPage={tblClassicPage}
            tblClassicUnitController={tblClassicUnitController}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Enhanced classic listener with more detailed logging
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

export default ShouldHandleOrganicClicksScreen;
