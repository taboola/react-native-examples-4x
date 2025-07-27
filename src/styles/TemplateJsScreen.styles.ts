import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from '../utils/constants';
import baseStyles from './baseStyles';

export const styles = StyleSheet.create({
  contentContainer: {
    padding: LAYOUT.PADDING,
  },
  title: {
    ...baseStyles.title,
    marginBottom: 20,
  },
  sectionTitle: {
    ...baseStyles.subtitle,
    marginTop: 15,
    marginBottom: 5,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  settingLabel: {
    ...baseStyles.text,
    flex: 1,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: LAYOUT.BORDER_RADIUS,
    padding: 8,
    color: COLORS.TEXT,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  unitContainer: {
    marginTop: 20,
    backgroundColor: COLORS.TABOOLA_CONTAINER_BG,
    padding: 15,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
}); 