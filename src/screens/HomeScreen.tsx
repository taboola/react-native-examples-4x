import { Text, View, StyleSheet } from 'react-native';
import baseStyles from '../styles/baseStyles';
import { MESSAGES } from '../utils/constants';

const HomeScreen = () => {
  return (
    <View style={baseStyles.flex}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{MESSAGES.HOME_WELCOME}</Text>
        <Text style={styles.instructionText}>{MESSAGES.HOME_INSTRUCTION}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
  },
  welcomeText: {
    ...baseStyles.title,
  },
  instructionText: {
    ...baseStyles.subtitle,
  },
});

export default HomeScreen;
