import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT, TYPOGRAPHY, OPACITY } from '../utils/constants';
import baseStyles from './baseStyles';

export const styles = StyleSheet.create({
  contentContainer: {
    padding: LAYOUT.PADDING,
    flexGrow: 1,
  },
  title: {
    ...baseStyles.title,
    marginBottom: LAYOUT.SECTION_MARGIN,
  },
  section: {
    marginBottom: LAYOUT.SECTION_MARGIN,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.PADDING,
  },
  sectionTitle: {
    ...baseStyles.title,
    textAlign: 'left',
    fontSize: TYPOGRAPHY.SECTION_TITLE_SIZE,
    marginBottom: LAYOUT.PADDING,
  },
  resetButton: {
    backgroundColor: COLORS.RESET_BUTTON,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: LAYOUT.BORDER_RADIUS,
  },
  resetButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: TYPOGRAPHY.RESET_BUTTON_SIZE,
    fontWeight: '600',
  },
  // iOS Log Level Button
  logLevelButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: LAYOUT.BORDER_RADIUS,
    backgroundColor: COLORS.BACKGROUND,
    padding: 15,
    height: LAYOUT.PROPERTY_MIN_HEIGHT,
  },
  logLevelButtonText: {
    ...baseStyles.text,
    color: COLORS.TEXT,
  },
  logLevelArrow: {
    fontSize: TYPOGRAPHY.ARROW_SIZE,
    color: COLORS.LIGHT_TEXT,
  },
  // Android Picker
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: LAYOUT.BORDER_RADIUS,
    backgroundColor: COLORS.BACKGROUND,
    height: LAYOUT.PROPERTY_MIN_HEIGHT,
    justifyContent: 'center',
  },
  picker: {
    height: LAYOUT.PROPERTY_MIN_HEIGHT,
    color: COLORS.TEXT,
  },
  // Predefined Properties
  predefinedPropertiesContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: LAYOUT.BORDER_RADIUS,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: 'hidden',
  },
  propertySection: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  propertySectionTitle: {
    ...baseStyles.text,
    fontWeight: '600',
    color: COLORS.TEXT,
    backgroundColor: COLORS.SECTION_HEADER_BG,
    padding: LAYOUT.PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.PADDING,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PROPERTY_BORDER,
    minHeight: LAYOUT.PROPERTY_MIN_HEIGHT,
  },
  disabledPropertyRow: {
    backgroundColor: COLORS.DISABLED_BG,
    opacity: OPACITY.DISABLED,
  },
  propertyLabelContainer: {
    ...baseStyles.flex,
    marginRight: LAYOUT.PADDING,
  },
  propertyLabel: {
    ...baseStyles.text,
    fontSize: TYPOGRAPHY.PROPERTY_LABEL_SIZE,
    color: COLORS.TEXT,
    lineHeight: 20,
  },
  disabledPropertyLabel: {
    color: COLORS.LIGHT_TEXT,
  },
  platformLabel: {
    fontSize: TYPOGRAPHY.PLATFORM_LABEL_SIZE,
    color: COLORS.LIGHT_TEXT,
    fontStyle: 'italic',
    marginTop: 2,
  },
  // Custom Property
  customPropertyContainer: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: LAYOUT.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: 'hidden',
  },
  subsectionTitle: {
    ...baseStyles.text,
    fontWeight: '600',
    marginBottom: 0,
    color: COLORS.TEXT,
    backgroundColor: COLORS.SECTION_HEADER_BG,
    padding: LAYOUT.PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  propertyForm: {
    padding: LAYOUT.PADDING,
  },
  inputContainer: {
    marginBottom: LAYOUT.INPUT_MARGIN,
  },
  inputLabel: {
    ...baseStyles.text,
    fontSize: TYPOGRAPHY.INPUT_LABEL_SIZE,
    fontWeight: '500',
    marginBottom: 8,
    color: COLORS.TEXT,
  },
  input: {
    ...baseStyles.text,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: LAYOUT.BORDER_RADIUS,
    padding: 12,
    backgroundColor: COLORS.BACKGROUND,
  },
  previewContainer: {
    marginTop: LAYOUT.PREVIEW_MARGIN,
    padding: 12,
    backgroundColor: COLORS.PREVIEW_BG,
    borderRadius: LAYOUT.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  previewLabel: {
    fontSize: TYPOGRAPHY.PREVIEW_LABEL_SIZE,
    fontWeight: '600',
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  previewText: {
    fontSize: TYPOGRAPHY.PREVIEW_LABEL_SIZE,
    fontFamily: 'monospace',
    color: COLORS.PRIMARY,
    backgroundColor: COLORS.BACKGROUND,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  applyButton: {
    backgroundColor: COLORS.APPLY_BUTTON,
    padding: LAYOUT.PADDING,
    borderRadius: LAYOUT.BORDER_RADIUS,
    ...baseStyles.centralize,
    marginTop: LAYOUT.APPLY_BUTTON_MARGIN,
  },
  applyButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: TYPOGRAPHY.APPLY_BUTTON_SIZE,
    fontWeight: 'bold',
  },
  customLabel: {
    fontSize: TYPOGRAPHY.PROPERTY_LABEL_SIZE,
    color: COLORS.LIGHT_TEXT,
    marginBottom: 12,
    fontStyle: 'italic',
  },
});
