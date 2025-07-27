export const PLATFORMS = {
    ANDROID: 'android',
    IOS: 'ios',
} as const;

export type PlatformOS = (typeof PLATFORMS)[keyof typeof PLATFORMS];

export const SUPPORTED_PLATFORMS = {
    ANDROID_ONLY: [PLATFORMS.ANDROID] as const,
    IOS_ONLY: [PLATFORMS.IOS] as const,
    BOTH: [PLATFORMS.ANDROID, PLATFORMS.IOS] as const,
} as const;

// Type guard
export const isSupportedPlatform = (
    platform: string
): platform is PlatformOS => {
    return platform === PLATFORMS.ANDROID || platform === PLATFORMS.IOS;
};
