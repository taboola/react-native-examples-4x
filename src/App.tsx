import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import type { FC } from 'react';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
