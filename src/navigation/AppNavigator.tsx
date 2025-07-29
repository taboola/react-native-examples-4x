import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaboolaFeedScreen from '../screens/TaboolaFeedScreen';
import HomeScreen from '../screens/HomeScreen';
import TBLClassicPageScreen from '../screens/TBLClassicPageScreen';
import { COLORS, LAYOUT, SCREENS, SCREEN_TITLES } from '../utils/constants';
import ShouldHandleOrganicClicksScreen from '../screens/ShouldHandleOrganicClicksScreen';
import GlobalSettingsScreen from '../screens/GlobalSettingsScreen';
import { useIsFocused } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function UnmountOnBlur({ children }) {
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return children;
}

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.HOME}
      screenLayout={({ children }) => <UnmountOnBlur>{children}</UnmountOnBlur>}
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
    </Drawer.Navigator>
  );
};

export default AppNavigator;
