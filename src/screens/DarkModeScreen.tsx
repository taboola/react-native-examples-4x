import {useEffect, useMemo, useState, useCallback} from 'react';
import {Text, ScrollView, Button, Switch, View, StyleSheet} from 'react-native';
import {
  TBLClassicUnit,
  Taboola,
  type TBLClassicListener,
} from '@taboola/react-native-plugin-4x';

import {useTheme} from '@react-navigation/native';
import {
  COLORS,
  LAYOUT,
  MESSAGES,
  PLACEMENT_PARAMS,
  PublisherName,
  PUBLISHERS_PROPERTY,
  TYPOGRAPHY,
  PARAGRAPHS,
} from '../utils/constants.ts';

import {useTaboolaCleanup} from '../hooks/useTaboolaCleanup.ts';

const CENTRE_FRANCE_MESSAGES = {
  STEP_1_TITLE: '1. Dark Mode Setting',
  STEP_2_TITLE: '2. Create Unit',
  STEP_3_TITLE: '3. Fetch Content',
};
const SDK_TESTER_PUBLISHER = PUBLISHERS_PROPERTY[PublisherName.SDK_TESTER_RND];

/**
 * A screen that demonstrates local page dark mode implementation using TBLClassicPage.setPageExtraProperties().
 * Creates TBLClassicUnitController manually instead of using useCreateUnit() hook
 * to allow setting page properties (via setPageExtraProperties) before controller creation.
 *
 * @remarks
 * For app-wide dark mode, use {@link Taboola.setGlobalExtraProperties} with
 * `{darkMode: "true"|"false"}` instead.
 */
const DarkModeScreen = () => {
  const tblClassicPage = useMemo(
    () =>
      Taboola.getClassicPage(
        SDK_TESTER_PUBLISHER.PAGE_URL,
        SDK_TESTER_PUBLISHER.PAGE_TYPE,
      ),
    [],
  );

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [tblClassicUnitController, setTblClassicUnitController] = useState<
    any | undefined
  >(undefined);

  useEffect(() => {
    tblClassicPage?.setPageExtraProperties({darkMode: isDarkMode.toString()});
  }, [tblClassicPage, isDarkMode]);


  const createUnit = useCallback(async () => {
    const {placement, mode, placementType} =
      PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET;

    const createdUnit = await tblClassicPage.buildUnit(
      placement,
      mode,
      placementType,
      classicListeners,
    );

    setTblClassicUnitController(createdUnit);
  }, [tblClassicPage]);

  useTaboolaCleanup(tblClassicPage);

  const colors = useTheme().colors;

  // Create dynamic styles that use theme colors
  const createDynamicStyles = (colors: any) =>
    StyleSheet.create({
      stepTitle: {
        color: colors.text,
        fontSize: TYPOGRAPHY.STEP_TITLE_SIZE,
        fontWeight: 'bold',
        marginBottom: LAYOUT.STEP_TITLE_MARGIN_BOTTOM,
      },
      qaInstruction: {
        color: colors.text,
        fontSize: TYPOGRAPHY.INSTRUCTION_SIZE,
        marginBottom: LAYOUT.TEXT_MARGIN_BOTTOM,
      },
      switchLabel: {
        color: colors.text,
        marginRight: LAYOUT.SWITCH_MARGIN_RIGHT,
      },
      contentText: {
        color: colors.text,
      },
      scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
      },
    });

  const dynamicStyles = useMemo(() => createDynamicStyles(colors), [colors]);

  return (
    <ScrollView
      contentContainerStyle={dynamicStyles.scrollContainer}
      style={[styles.scrollView, {backgroundColor: colors.background}]}>
      <View style={dynamicStyles.scrollContainer}>
        <Text style={dynamicStyles.stepTitle}>
          {CENTRE_FRANCE_MESSAGES.STEP_1_TITLE}
        </Text>
        <Text style={dynamicStyles.qaInstruction}>
          {MESSAGES.DARK_MODE_INSTRUCTION}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={dynamicStyles.switchLabel}>
            {MESSAGES.SWITCH_DARK_MODE}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(prevState => !prevState)}
            trackColor={{
              false: COLORS.SWITCH_TRACK_FALSE,
              true: COLORS.SWITCH_TRACK_TRUE,
            }}
            thumbColor={
              isDarkMode
                ? COLORS.SWITCH_THUMB_ACTIVE
                : COLORS.SWITCH_THUMB_DISABLED
            }
          />
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={dynamicStyles.stepTitle}>
          {CENTRE_FRANCE_MESSAGES.STEP_2_TITLE}
        </Text>
        <Text style={dynamicStyles.qaInstruction}>
          {MESSAGES.CREATE_UNIT_INSTRUCTION}
        </Text>
        <Button title={MESSAGES.CREATE_UNIT} onPress={createUnit} />
      </View>

      <View style={styles.stepContainer}>
        <Text style={dynamicStyles.stepTitle}>
          {CENTRE_FRANCE_MESSAGES.STEP_3_TITLE}
        </Text>
        <Text style={dynamicStyles.qaInstruction}>
          {MESSAGES.FETCH_CONTENT_INSTRUCTION}
        </Text>
        <Button
          title={MESSAGES.FETCH_CONTENT}
          onPress={() => {
            tblClassicUnitController?.fetchContent();
          }}
          disabled={!tblClassicUnitController}
        />
      </View>

      <Text style={dynamicStyles.contentText}>
        {PARAGRAPHS.P1}
      </Text>

      <Text style={dynamicStyles.contentText}>
        {PARAGRAPHS.P2}
      </Text>

      {tblClassicUnitController && (
        <TBLClassicUnit
          tblClassicUnitController={tblClassicUnitController}
          tblClassicPage={tblClassicPage}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
  },
  stepContainer: {
    marginVertical: LAYOUT.STEP_CONTAINER_MARGIN,
    padding: LAYOUT.STEP_CONTAINER_PADDING,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const classicListeners: TBLClassicListener = {
  onResize(height: number) {
    console.log('[TBLClassicListener] onResize: ', {height});
  },
  onEvent(actionType: number, data: string) {
    console.log('[TBLClassicListener] onEvent: ', {actionType, data});
  },
  onAdReceiveFail(error: string) {
    console.log('[TBLClassicListener] onAdReceiveFail: ', {error});
  },
  onAdReceiveSuccess() {
    console.log('[TBLClassicListener] onAdReceiveSuccess');
  },
  onItemClick(
    placementName: string,
    itemId: string,
    clickUrl: string,
    isOrganic: boolean,
    customData?: string | null,
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

export default DarkModeScreen;
