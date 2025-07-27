import React from 'react';
import { View, Text, Switch, TextInput } from 'react-native';
import { styles } from '../styles/TemplateJsScreen.styles';
import { COLORS, MESSAGES } from '../utils/constants';
import { PlatformSupportedField } from './PlatformSupportedField';
import type {
  TaboolaApiState,
  TaboolaApiActions,
} from '../hooks/useTaboolaApiState';
import {SUPPORTED_PLATFORMS} from "../platfroms.ts";

interface TaboolaSettingsFormProps {
  state: TaboolaApiState;
  actions: TaboolaApiActions;
  showPageSettings?: boolean;
  showTemplateSettings?: boolean;
  title?: string;
}

export const TaboolaSettingsForm: React.FC<TaboolaSettingsFormProps> = ({
  state,
  actions,
  showPageSettings = true,
  showTemplateSettings = true,
  title,
}) => {
  return (
    <View>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}

      {showPageSettings && (
        <>
          <Text style={styles.sectionTitle}>Classic Page Settings</Text>

          {/* Android-only methods */}
          <PlatformSupportedField
            supportedPlatforms={SUPPORTED_PLATFORMS.ANDROID_ONLY}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Publisher</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setPublisher}
                value={state.publisher}
                placeholder="Enter publisher name"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField
            supportedPlatforms={SUPPORTED_PLATFORMS.ANDROID_ONLY}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Page Type</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setPageType}
                value={state.pageType}
                placeholder="Enter page type"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField
            supportedPlatforms={SUPPORTED_PLATFORMS.ANDROID_ONLY}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Target Type</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setTargetType}
                value={state.targetType}
                placeholder="Enter target type"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField
            supportedPlatforms={SUPPORTED_PLATFORMS.ANDROID_ONLY}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Page URL</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setPageUrl}
                value={state.pageUrl}
                placeholder="Enter page URL"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          {/* Common methods (available on both platforms) */}
          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Serial Fetch Timeout</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setSerialFetchTimeout}
                value={state.serialFetchTimeout}
                placeholder="Enter timeout in milliseconds"
                placeholderTextColor={COLORS.LIGHT_TEXT}
                keyboardType="numeric"
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Extra Properties Key</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setExtraPropertiesKey}
                value={state.extraPropertiesKey}
                placeholder="Enter property key"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>Extra Properties Value</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setExtraPropertiesValue}
                value={state.extraPropertiesValue}
                placeholder="Enter property value"
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>
        </>
      )}

      {showTemplateSettings && (
        <>
          <Text style={styles.sectionTitle}>Template JS Settings</Text>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>
                {MESSAGES.TEMPLATE_DISABLE_TRC_CACHE}
              </Text>
              <Switch
                trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
                thumbColor={
                  state.disableTRCCache
                    ? COLORS.SECONDARY
                    : COLORS.SWITCH_THUMB_DISABLED
                }
                onValueChange={actions.toggleTRCCache}
                value={state.disableTRCCache}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>{MESSAGES.TEMPLATE_KEY}</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setQueryKey}
                value={state.queryKey}
                placeholder={MESSAGES.TEMPLATE_ENTER_KEY}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>{MESSAGES.TEMPLATE_VALUE}</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setQueryValue}
                value={state.queryValue}
                placeholder={MESSAGES.TEMPLATE_ENTER_VALUE}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>
                {MESSAGES.TEMPLATE_CAMPAIGN_ID}
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  actions.setRequestCampaigns(
                    value ? [parseInt(value, 10)] : []
                  )
                }
                keyboardType="numeric"
                placeholder={MESSAGES.TEMPLATE_ENTER_CAMPAIGN_ID}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>{MESSAGES.TEMPLATE_GEO}</Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setRequestGeo}
                value={state.requestGeo}
                placeholder={MESSAGES.TEMPLATE_ENTER_GEO}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>
                {MESSAGES.TEMPLATE_TRC_SERVER}
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setSpecificTRCServer}
                value={state.specificTRCServer}
                placeholder={MESSAGES.TEMPLATE_ENTER_SERVER}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>

          <PlatformSupportedField supportedPlatforms={SUPPORTED_PLATFORMS.BOTH}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingLabel}>
                {MESSAGES.TEMPLATE_VIDEO_FORMAT}
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={actions.setVideoCampaignFormat}
                value={state.videoCampaignFormat}
                placeholder={MESSAGES.TEMPLATE_ENTER_FORMAT}
                placeholderTextColor={COLORS.LIGHT_TEXT}
              />
            </View>
          </PlatformSupportedField>
        </>
      )}
    </View>
  );
};
