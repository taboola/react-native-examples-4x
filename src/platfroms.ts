export const PLATFORMS = {
    ANDROID: 'android',
    IOS: 'ios',
} as const;

export const SUPPORTED_PLATFORMS = {
    ANDROID_ONLY: [PLATFORMS.ANDROID] as const,
    IOS_ONLY: [PLATFORMS.IOS] as const,
    BOTH: [PLATFORMS.ANDROID, PLATFORMS.IOS] as const,
} as const;

