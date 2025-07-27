import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from '../utils/constants';
import baseStyles from './baseStyles';

export const styles = StyleSheet.create({
  controlContainer: {
    marginBottom: 20,
  },
  title: {
    ...baseStyles.title,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    ...baseStyles.text,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
  buttonText: {
    ...baseStyles.text,
    color: COLORS.TEXT,
  },
  container: {
    flex: 1,
    padding: LAYOUT.PADDING,
  },
  taboolaContainer: {
    marginTop: 20,
    backgroundColor: COLORS.TABOOLA_CONTAINER_BG,
    padding: 15,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
  sectionTitle: {
    ...baseStyles.subtitle,
    marginBottom: 10,
  },
});
