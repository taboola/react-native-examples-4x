import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { COLORS, MESSAGES } from '../utils/constants';
import { styles } from '../styles/ShouldHandleOrganicClicksScreen.styles';
import type { FC } from 'react';

interface OrganicClicksControlsProps {
  shouldHandleOrganicClicks: boolean;
  onToggle: () => void;
  onFetchContent: () => void;
}

export const OrganicClicksControls: FC<OrganicClicksControlsProps> = ({
  shouldHandleOrganicClicks,
  onToggle,
  onFetchContent,
}) => (
  <View style={styles.controlContainer}>
    <Text style={styles.title}>{MESSAGES.ORGANIC_CLICKS_TEST}</Text>
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>
        {MESSAGES.TABOOLA_HANDLE_ORGANIC_CLICKS}{' '}
        {shouldHandleOrganicClicks ? MESSAGES.ENABLED : MESSAGES.DISABLED}
      </Text>
      <Switch
        value={shouldHandleOrganicClicks}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
        thumbColor={
          shouldHandleOrganicClicks
            ? COLORS.SECONDARY
            : COLORS.SWITCH_THUMB_DISABLED
        }
      />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onFetchContent}>
        <Text style={styles.buttonText}>{MESSAGES.FETCH_CONTENT}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
