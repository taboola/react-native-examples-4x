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
} from '../utils/constants.ts';

import {useTaboolaCleanup} from '../hooks/useTaboolaCleanup.ts';

const CENTRE_FRANCE_MESSAGES = {
  STEP_1_TITLE: '1. Dark Mode Setting',
  STEP_2_TITLE: '2. Create Unit',
  STEP_3_TITLE: '3. Fetch Content',
};
const SDK_TESTER_PUBLISHER = PUBLISHERS_PROPERTY[PublisherName.SDK_TESTER_RND];

const DarkModeScreen = () => {
  const tblClassicPage = useMemo(
    () =>
      Taboola.getClassicPage(
        SDK_TESTER_PUBLISHER.PAGE_URL,
        SDK_TESTER_PUBLISHER.PAGE_TYPE,
      ),
    [],
  );

  const [isDarkMode, setIsDarMode] = useState<boolean>(false);
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

  const dynamicStyles = createDynamicStyles(colors);

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
            onValueChange={() => setIsDarMode(prevState => !prevState)}
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
        Ut aliquam arcu in libero dictum tincidunt. Nullam venenatis augue
        turpis, sit amet hendrerit mauris pharetra sed. Fusce sodales rhoncus
        ipsum ut rhoncus. Donec id nulla vitae tellus mattis eleifend. Integer
        nec tortor augue. Vivamus leo lorem, dictum nec cursus vitae, congue sed
        purus. Quisque eget fringilla diam. Aenean sollicitudin magna quis
        pellentesque fringilla. Praesent a neque congue, tincidunt lacus id,
        congue ligula. Nulla facilisi. Sed bibendum orci id ipsum dignissim
        placerat. Aliquam vel tincidunt ligula. Donec id augue egestas,
        porttitor neque eu, imperdiet nulla. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae;
      </Text>

      <Text style={dynamicStyles.contentText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut augue
        maximus, sagittis eros vel, dictum dui. Proin nibh odio, varius eu
        interdum sed, porta non massa. Cras mattis, risus non porttitor
        dignissim, erat lacus gravida lorem, quis egestas ligula eros placerat
        lacus. Phasellus viverra egestas justo, a sagittis ante gravida vitae.
        Proin pharetra ante ac arcu porttitor, at lacinia est aliquet. Maecenas
        nisl urna, ultricies vitae mattis quis, cursus sed lorem. Quisque
        malesuada nec magna sit amet molestie. Praesent mi lacus, mollis sit
        amet suscipit et, gravida at ipsum. Vestibulum vestibulum efficitur
        neque, at auctor orci viverra ut. Maecenas enim metus, gravida vitae
        tempor ut, interdum ac sapien. Sed vel eros ut quam vulputate sagittis.
        Pellentesque consectetur quis ligula a condimentum. Sed vitae nunc
        cursus, pretium sem vel, consectetur lorem. In hac habitasse platea
        dictumst. Aliquam placerat ex cursus, dictum mi eget, ultrices nulla. In
        lacinia id lorem at malesuada. Praesent fermentum nec nisl eu pretium.
        Vestibulum nec dolor pretium nunc cursus tempus. Fusce congue magna
        quam, id pulvinar felis mollis tincidunt. Nullam ornare ut ante non
        tempor. Cras eget neque odio. Donec pretium dignissim mauris, sit amet
        pharetra massa mollis in. Proin nibh libero, malesuada vitae ipsum eget,
        pellentesque maximus est. Nunc ex lacus, sagittis eu molestie sit amet,
        mattis vel justo. Etiam sit amet varius ligula, ut consequat elit. Nam
        ullamcorper nunc at mi porttitor vulputate. Vivamus dapibus felis
        tincidunt convallis lacinia. Cras ornare dapibus fringilla. Nam
        pellentesque pharetra enim non pharetra. Integer tristique egestas
        risus, vel imperdiet massa aliquet nec. Suspendisse ultricies diam id
        neque hendrerit, sed interdum eros laoreet. Sed eros sem, volutpat quis
        posuere non, efficitur sed sem. In nec sapien quis ante blandit ornare.
        Aenean volutpat hendrerit mauris non lacinia. Curabitur vitae
        ullamcorper est, ac tincidunt augue. Praesent ultrices vulputate ante,
        vel egestas orci dictum quis. Ut rutrum erat dui, ac hendrerit nulla
        scelerisque a. Aliquam leo velit, suscipit quis fermentum vel, gravida
        eu nunc. Curabitur convallis, augue gravida posuere elementum, risus
        metus posuere diam, id cursus eros purus ac turpis. Nullam nec mi
        turpis. Fusce et lobortis libero. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Nam feugiat
        faucibus interdum.
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
