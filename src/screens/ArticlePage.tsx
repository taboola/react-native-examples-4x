import {
  Taboola,
  type TBLClassicListener,
  TBLClassicUnit,
  TBLPlacementType,
  useCreateUnit,
} from '@taboola/react-native-plugin-4x';
import {useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';


function ArticlePage() {

  const tblClassicPage = useMemo(
    () => Taboola.getClassicPage('https://www.example.com', 'article'),
    [],
  );

  // Enhanced classic listener with more detailed logging
  const tblClassicListener: TBLClassicListener = {
    onResize(height) {
      console.log(`[TBLSOS][ArticlePage] onResize called with height: ${height}`);
    },
    onEvent(actionType: number, data: string) {
      console.log(
        `[TBLSOS][ArticlePage] onEvent called with actionType: ${actionType}, data: ${data}`,
      );
    },
    onAdReceiveFail(error: string) {
      console.log(`[TBLSOS][ArticlePage] onAdReceiveFail called with error: ${error}`);
    },
    onAdReceiveSuccess() {
      console.log(`[TBLSOS][ArticlePage] onAdReceiveSuccess called`);
    },
    onItemClick(
      placementName: string,
      itemId: string,
      clickUrl: string,
      isOrganic: boolean,
      customData?: string | null,
    ) {
      console.log(
        `[TBLSOS][ArticlePage] onItemClick called with placementName: ${placementName}, itemId: ${itemId}, clickUrl: ${clickUrl}, isOrganic: ${isOrganic}, customData: ${customData}`,
      );
    },
    onTaboolaWidgetOnTop() {
      console.log(`[TBLSOS][ArticlePage] onTaboolaWidgetOnTop called`);
    },
    onUpdateContentCompleted() {
      console.log(`[TBLSOS][ArticlePage] onUpdateContentCompleted called`);
    },
  };

  const {tblClassicUnitController: classicUnit} = useCreateUnit({
    tblClassicPage,
    placement: 'Below Article Thumbnails',
    mode: 'thumbs-feed-01',
    placementType: TBLPlacementType.PAGE_BOTTOM,
    tblClassicListener,
  });

  useEffect(() => {
    console.log(`[TBLSOS][ArticlePage] ArticlePage mounted, fetching content for classic unit -${classicUnit}`);
    if (classicUnit) {
      classicUnit.fetchContent();
    }
  }, [classicUnit]);

  useEffect(() => {
    return () => {
      if (tblClassicPage.pageId) {
        Taboola.removeClassicPage(tblClassicPage.pageId);
      }
    };
  }, [tblClassicPage]);

  return (
    <View style={Styles.taboolaContainer}>
      <TBLClassicUnit
        tblClassicPage={tblClassicPage}
        tblClassicUnitController={classicUnit}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  taboolaContainer: {
    flex: 1,
    padding: 0,
    paddingTop: 1,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default ArticlePage;
