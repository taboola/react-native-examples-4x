import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaboolaFeedScreen from '../screens/TaboolaFeedScreen';
import HomeScreen from '../screens/HomeScreen';
import TBLClassicPageScreen from '../screens/TBLClassicPageScreen';
import { COLORS, LAYOUT, SCREENS, SCREEN_TITLES } from '../utils/constants';
import ShouldHandleOrganicClicksScreen from '../screens/ShouldHandleOrganicClicksScreen';
import GlobalSettingsScreen from '../screens/GlobalSettingsScreen';
import { useIsFocused } from '@react-navigation/native';
import DarkModeScreen from "../screens/DarkModeScreen.tsx";
import WebIntegrationScreen from '../screens/WebIntegrationScreen';

const Drawer = createDrawerNavigator();

function UnmountOnBlur({ children }: { children: React.ReactElement }) {
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return children;
}

// The header and drawer apply their own safe-area insets, so only the screen
// content (below the header) is padded here, on the edges the header doesn't cover.
function ScreenLayout({ children }: { children: React.ReactElement }) {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
      <UnmountOnBlur>{children}</UnmountOnBlur>
    </SafeAreaView>
  );
}

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.HOME}
      screenLayout={ScreenLayout}
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: COLORS.DRAWER_BG,
          width: LAYOUT.DRAWER_WIDTH,
        },
        lazy: false,
      }}
    >
      <Drawer.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ title: SCREEN_TITLES.HOME }}
      />
      <Drawer.Screen
        name={SCREENS.TABOOLA_FEED_AND_WIDGET}
        component={TaboolaFeedScreen}
        options={{ title: SCREEN_TITLES.TABOOLA_FEED_AND_WIDGET }}
      />
      <Drawer.Screen
        name={SCREENS.TBLClassicPage}
        component={TBLClassicPageScreen}
        options={{ title: SCREEN_TITLES.TBLClassicPage }}
      />
      <Drawer.Screen
        name={SCREENS.SHOULD_HANDLE_ORGANIC_CLICKS_SCREEN}
        component={ShouldHandleOrganicClicksScreen}
        options={{ title: SCREEN_TITLES.SHOULD_HANDLE_ORGANIC_CLICKS_SCREEN }}
      />
      <Drawer.Screen
        name={SCREENS.GLOBAL_SETTINGS}
        component={GlobalSettingsScreen}
        options={{ title: SCREEN_TITLES.GLOBAL_SETTINGS }}
      />
        <Drawer.Screen
            name={SCREENS.DARK_MODE}
            component={DarkModeScreen}
            options={{ title: SCREEN_TITLES.DARK_MODE }}
        />
        <Drawer.Screen
            name={SCREENS.WEB_INTEGRATION}
            component={WebIntegrationScreen}
            options={{ title: SCREEN_TITLES.WEB_INTEGRATION }}
        />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AppNavigator;
