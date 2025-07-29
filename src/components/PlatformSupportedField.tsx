import React from 'react';
import { Platform } from 'react-native';
import type { ReactNode } from 'react';

interface PlatformSupportedFieldProps {
  children: ReactNode;
  supportedPlatforms: readonly string[];
}

export const PlatformSupportedField: React.FC<PlatformSupportedFieldProps> = ({
  children,
  supportedPlatforms,
}) => {
  const currentPlatform = Platform.OS;

  // Only render if current platform is in the supported platforms array
  if (supportedPlatforms.includes(currentPlatform)) {
    return <>{children}</>;
  }

  // Don't render anything if platform is not supported
  return null;
};
