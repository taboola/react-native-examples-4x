import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActionSheetIOS,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Taboola, TBLLogLevel } from '@taboola/react-native-plugin-4x';
import { styles } from '../styles/GlobalSettingsScreen.styles';
import {
  MESSAGES,
  COLORS,
  PROPERTY_TYPES,
  EXTRA_PROPERTY_KEYS,
  EXTRA_PROPERTY_LABELS,
  SCREEN_TITLES,
} from '../utils/constants';
import baseStyles from '../styles/baseStyles';
import { isIOS } from '../utils/constants';

// Common properties (available on both platforms)
const COMMON_PROPERTIES = [
  {
    key: EXTRA_PROPERTY_KEYS.HIDE_SCROLLING_BARS,
    label: EXTRA_PROPERTY_LABELS.HIDE_SCROLLING_BARS,
  },
  {
    key: EXTRA_PROPERTY_KEYS.KEEP_VIEW_ID,
    label: EXTRA_PROPERTY_LABELS.KEEP_VIEW_ID,
  },
  { key: EXTRA_PROPERTY_KEYS.OMSDK, label: EXTRA_PROPERTY_LABELS.OMSDK },
  { key: EXTRA_PROPERTY_KEYS.CDNS, label: EXTRA_PROPERTY_LABELS.CDNS },
];

// iOS-specific properties
const IOS_PROPERTIES = [
  {
    key: EXTRA_PROPERTY_KEYS.DEBUG_MODE_INSPECTABLE_WEBVIEW,
    label: EXTRA_PROPERTY_LABELS.DEBUG_MODE_INSPECTABLE_WEBVIEW,
  },
];

type PropertyType = typeof PROPERTY_TYPES.COMMON | typeof PROPERTY_TYPES.IOS;

/**
 * GlobalSettingsScreen - React Native screen component for configuring Taboola SDK global settings
 *
 * This screen provides a comprehensive interface for managing Taboola SDK global configurations including:
 * - Setting log levels for debugging and monitoring
 * - Configuring predefined extra properties (common and iOS-specific)
 * - Adding custom extra properties with key-value pairs
 * - Platform-specific UI adaptations (iOS ActionSheet vs Android Picker)
 * - Real-time preview of custom property configurations
 * - Applying all settings to the Taboola SDK via setGlobalExtraProperties
 */
const GlobalSettingsScreen: React.FC = () => {
  const [selectedLogLevel, setSelectedLogLevel] = useState<TBLLogLevel>(
    TBLLogLevel.INFO
  );
  const [propertyKey, setPropertyKey] = useState('');
  const [propertyValue, setPropertyValue] = useState('');

  const [properties, setProperties] = useState({
    [PROPERTY_TYPES.COMMON]: COMMON_PROPERTIES.reduce(
      (acc, prop) => {
        acc[prop.key] =
          prop.key === EXTRA_PROPERTY_KEYS.KEEP_VIEW_ID ||
          prop.key === EXTRA_PROPERTY_KEYS.OMSDK;
        return acc;
      },
      {} as Record<string, boolean>
    ),
    [PROPERTY_TYPES.IOS]: IOS_PROPERTIES.reduce(
      (acc, prop) => {
        acc[prop.key] = false;
        return acc;
      },
      {} as Record<string, boolean>
    ),
  });

  const logLevels = Object.values(TBLLogLevel);

  const showLogLevelPicker = useCallback(() => {
    if (isIOS()) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [MESSAGES.CANCEL, ...logLevels],
          cancelButtonIndex: 0,
          title: MESSAGES.SELECT_LOG_LEVEL,
        },
        (buttonIndex) => {
          if (buttonIndex > 0 && logLevels[buttonIndex - 1]) {
            setSelectedLogLevel(logLevels[buttonIndex - 1]!);
          }
        }
      );
    }
  }, [logLevels]);

  const handleLogLevelChange = useCallback((logLevel: TBLLogLevel) => {
    setSelectedLogLevel(logLevel);
  }, []);

  const toggleProperty = useCallback((type: PropertyType, key: string) => {
    setProperties((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key],
      },
    }));
  }, []);

  const applySettings = useCallback(() => {
    try {
      // Apply log level
      Taboola.setLogLevel(selectedLogLevel);

      // Collect all properties to apply
      const allProperties: Record<string, string> = {};

      // Add common properties that are enabled
      Object.entries(properties[PROPERTY_TYPES.COMMON]).forEach(
        ([key, value]) => {
          allProperties[key] = value.toString();
        }
      );

      // Add iOS-specific properties if on iOS
      if (isIOS()) {
        Object.entries(properties[PROPERTY_TYPES.IOS]).forEach(
          ([key, value]) => {
            allProperties[key] = value.toString();
          }
        );
      }

      // Add custom property if both key and value are provided
      if (propertyKey.trim() && propertyValue.trim()) {
        allProperties[propertyKey.trim()] = propertyValue.trim();
      }

      // Apply all properties if any exist
      if (Object.keys(allProperties).length > 0) {
        Taboola.setGlobalExtraProperties(allProperties);
      }

      // Get enabled property keys
      const enabledCommonKeys = Object.entries(
        properties[PROPERTY_TYPES.COMMON]
      )
        .filter(([_, value]) => value)
        .map(([key, _]) => key);

      const enabledIOSKeys = isIOS()
        ? Object.entries(properties[PROPERTY_TYPES.IOS])
          .filter(([_, value]) => value)
          .map(([key, _]) => key)
        : [];

      const customPropText =
        propertyKey.trim() && propertyValue.trim()
          ? `\n${MESSAGES.CUSTOM_PROPERTY_LABEL} ${propertyKey.trim()} = ${propertyValue.trim()}`
          : '';

      const commonPropsText =
        enabledCommonKeys.length > 0
          ? `\n${MESSAGES.COMMON_PROPERTIES_LABEL} ${enabledCommonKeys.join(', ')}`
          : '';

      const iosPropsText =
        enabledIOSKeys.length > 0
          ? `\n${MESSAGES.IOS_PROPERTIES_LABEL} ${enabledIOSKeys.join(', ')}`
          : '';

      Alert.alert(
        MESSAGES.SUCCESS,
        `${MESSAGES.SETTINGS_APPLIED_SUCCESS}\n${MESSAGES.LOG_LEVEL_LABEL} ${selectedLogLevel}${commonPropsText}${iosPropsText}${customPropText}`
      );
    } catch (error) {
      Alert.alert(MESSAGES.ERROR, MESSAGES.SETTINGS_APPLY_ERROR);
      console.error(`${MESSAGES.SETTINGS_APPLICATION_ERROR}`, error);
    }
  }, [selectedLogLevel, properties, propertyKey, propertyValue]);

  const renderPropertySection = (
    title: string,
    propertyList: Array<{ key: string; label: string }>,
    propertyState: Record<string, boolean>,
    onToggle: (key: string) => void
  ) => (
    <View style={styles.propertySection}>
      <Text style={styles.propertySectionTitle}>{title}</Text>
      {propertyList.map((property) => (
        <View key={property.key} style={styles.propertyRow}>
          <View style={styles.propertyLabelContainer}>
            <Text style={styles.propertyLabel}>{property.label}</Text>
          </View>
          <Switch
            value={propertyState[property.key]}
            onValueChange={() => onToggle(property.key)}
            trackColor={{
              false: COLORS.SWITCH_TRACK_FALSE,
              true: COLORS.SWITCH_TRACK_TRUE,
            }}
            thumbColor={
              propertyState[property.key]
                ? COLORS.SWITCH_THUMB_ACTIVE
                : COLORS.SWITCH_THUMB_DISABLED
            }
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={baseStyles.flex}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{SCREEN_TITLES.GLOBAL_SETTINGS}</Text>

        {/* Log Level Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{MESSAGES.LOG_LEVEL}</Text>

          {isIOS() ? (
            <TouchableOpacity
              style={styles.logLevelButton}
              onPress={showLogLevelPicker}
            >
              <Text style={styles.logLevelButtonText}>{selectedLogLevel}</Text>
              <Text style={styles.logLevelArrow}>
                {MESSAGES.DROPDOWN_ARROW}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLogLevel}
                onValueChange={handleLogLevelChange}
                style={styles.picker}
                dropdownIconColor={MESSAGES.PICKER_DROPDOWN_COLOR}
              >
                {logLevels.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {/* Extra Properties Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{MESSAGES.EXTRA_PROPERTIES}</Text>

          <View style={styles.predefinedPropertiesContainer}>
            {/* Common Properties */}
            {renderPropertySection(
              MESSAGES.COMMON_PROPERTIES,
              COMMON_PROPERTIES,
              properties[PROPERTY_TYPES.COMMON],
              (key) => toggleProperty(PROPERTY_TYPES.COMMON, key)
            )}

            {/* iOS Properties (only show on iOS) */}
            {isIOS() &&
              renderPropertySection(
                MESSAGES.IOS_PROPERTIES,
                IOS_PROPERTIES,
                properties[PROPERTY_TYPES.IOS],
                (key) => toggleProperty(PROPERTY_TYPES.IOS, key)
              )}
          </View>

          {/* Custom Property */}
          <View style={styles.customPropertyContainer}>
            <Text style={styles.subsectionTitle}>
              {MESSAGES.CUSTOM_EXTRA_PROPERTY}
            </Text>
            <View style={styles.propertyForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{MESSAGES.PROPERTY_KEY}:</Text>
                <TextInput
                  style={styles.input}
                  value={propertyKey}
                  onChangeText={setPropertyKey}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {MESSAGES.PROPERTY_VALUE}:
                </Text>
                <TextInput
                  style={styles.input}
                  value={propertyValue}
                  onChangeText={setPropertyValue}
                />
              </View>
              {propertyKey.trim() && propertyValue.trim() && (
                <View style={styles.previewContainer}>
                  <Text style={styles.previewLabel}>{MESSAGES.PREVIEW}</Text>
                  <Text style={styles.previewText}>
                    {`{ "${propertyKey.trim()}": "${propertyValue.trim()}" }`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={applySettings}>
          <Text style={styles.applyButtonText}>{MESSAGES.APPLY_SETTINGS}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GlobalSettingsScreen;
