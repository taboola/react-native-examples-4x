import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, LAYOUT } from '../utils/constants';
import { PlatformSupportedField } from './PlatformSupportedField';
import {PLATFORMS, SUPPORTED_PLATFORMS} from "../platfroms.ts";

interface UnitSettingsState {
  publisher: string;
  pageType: string;
  targetType: string;
  pageUrl: string;
  extraPropertiesKey: string;
  extraPropertiesValue: string;
}

interface UnitSettingsActions {
  setPublisher: (value: string) => void;
  setPageType: (value: string) => void;
  setTargetType: (value: string) => void;
  setPageUrl: (value: string) => void;
  setExtraPropertiesKey: (value: string) => void;
  setExtraPropertiesValue: (value: string) => void;
}

interface UnitSettingsFormProps {
  title: string;
  state: UnitSettingsState;
  actions: UnitSettingsActions;
  onApplySettings: () => void;
  onFetchContent: () => void;
  onRefresh: () => void;
  onReset: () => void;
}

export const UnitSettingsForm: React.FC<UnitSettingsFormProps> = ({
  title,
  state,
  actions,
  onApplySettings,
  onFetchContent,
  onRefresh,
  onReset,
}) => {
  return (
    <View style={styles.unitControlsContainer}>
      <Text style={styles.unitControlsTitle}>{title}</Text>

      {/* Android-only Unit Settings */}
      <PlatformSupportedField supportedPlatforms={[PLATFORMS.ANDROID]}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Publisher Name (Android Only):</Text>
          <TextInput
            style={styles.input}
            value={state.publisher}
            onChangeText={actions.setPublisher}
            placeholder="Enter publisher name"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      <PlatformSupportedField supportedPlatforms={[PLATFORMS.ANDROID]}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Page Type (Android Only):</Text>
          <TextInput
            style={styles.input}
            value={state.pageType}
            onChangeText={actions.setPageType}
            placeholder="Enter page type"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      <PlatformSupportedField supportedPlatforms={[PLATFORMS.ANDROID]}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Page URL (Android Only):</Text>
          <TextInput
            style={styles.input}
            value={state.pageUrl}
            onChangeText={actions.setPageUrl}
            placeholder="Enter page URL"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      <PlatformSupportedField supportedPlatforms={[PLATFORMS.ANDROID]}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Target Type (Android Only):</Text>
          <TextInput
            style={styles.input}
            value={state.targetType}
            onChangeText={actions.setTargetType}
            placeholder="Enter target type"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      {/* Common Unit Settings (Both Platforms) */}
      <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Extra Properties Key (Both Platforms):
          </Text>
          <TextInput
            style={styles.input}
            value={state.extraPropertiesKey}
            onChangeText={actions.setExtraPropertiesKey}
            placeholder="Enter property key"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Extra Properties Value (Both Platforms):
          </Text>
          <TextInput
            style={styles.input}
            value={state.extraPropertiesValue}
            onChangeText={actions.setExtraPropertiesValue}
            placeholder="Enter property value"
            placeholderTextColor={COLORS.LIGHT_TEXT}
          />
        </View>
      </PlatformSupportedField>

      {/* Action Buttons */}
      <View style={styles.unitButtonRow}>
        <TouchableOpacity
          style={[styles.unitButton, { backgroundColor: COLORS.PRIMARY }]}
          onPress={onApplySettings}
        >
          <Text style={styles.unitButtonText}>Apply Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, { backgroundColor: '#27ae60' }]}
          onPress={onFetchContent}
        >
          <Text style={styles.unitButtonText}>Fetch Content</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.unitButtonRow}>
        <TouchableOpacity
          style={[styles.unitButton, { backgroundColor: '#f39c12' }]}
          onPress={onRefresh}
        >
          <Text style={styles.unitButtonText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, { backgroundColor: '#e74c3c' }]}
          onPress={onReset}
        >
          <Text style={styles.unitButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unitControlsContainer: {
    backgroundColor: COLORS.BACKGROUND,
    padding: LAYOUT.PADDING,
    margin: 10,
    borderRadius: LAYOUT.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  unitControlsTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.TEXT,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontWeight: '500',
    marginBottom: 5,
    color: COLORS.TEXT,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: LAYOUT.BORDER_RADIUS,
    padding: 10,
    color: COLORS.TEXT,
    backgroundColor: COLORS.BACKGROUND,
  },
  unitButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: LAYOUT.BORDER_RADIUS,
    marginHorizontal: 5,
  },
  unitButtonText: {
    color: COLORS.BACKGROUND,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
});
