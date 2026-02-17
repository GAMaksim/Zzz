// ==========================================
// Zzz — TypeScript interfaces & types
// ==========================================

// ---------- Language ----------
export type Language = 'en' | 'ru';

// ---------- Sound ----------
export type SoundMood = 'calm' | 'relaxed' | 'peaceful' | 'cozy';

export interface SoundPreset {
    id: string;
    name: string;
    description: string;
    icon: string;
    file: string;
    isPremium: boolean;
    mood: SoundMood;
}

// ---------- Notifications ----------
export type NotificationType =
    | 'dinner'
    | 'ritual_start'
    | 'evening_care'
    | 'digital_sunset'
    | 'final_moment'
    | 'still_awake';

// ---------- Sleep Score ----------
export type SleepScoreRating = 'excellent' | 'good' | 'fair' | 'poor';

export interface SleepScoreResult {
    score: number;
    rating: SleepScoreRating;
    color: string;
    recommendation: { en: string; ru: string };
}

// ---------- Database Models ----------
export interface UserSettingsData {
    id: string;
    isPremium: boolean;
    onboardingCompleted: boolean;
    language: Language;
    selectedSound: string | null;
    trialStartDate: Date | null;
    installDate: Date;
}

export interface SleepScheduleData {
    id: string;
    dayOfWeek: number; // 0 = Sunday, 6 = Saturday
    plannedBedtime: string; // "22:00" format
    isEnabled: boolean;
}

export interface SleepRecordData {
    id: string;
    date: Date;
    plannedBedtime: string;
    actualBedtime: string | null;
    wentToBedOnTime: boolean;
    quality: number | null; // 1-5
}

// ---------- Navigation ----------
export type RootStackParamList = {
    Onboarding: undefined;
    ScheduleSetup: undefined;
    MainTabs: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Soundscapes: undefined;
    Statistics: undefined;
    Settings: undefined;
};

// ---------- Day of Week ----------
export const DAY_NAMES = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const,
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] as const,
};

export const DAY_NAMES_FULL = {
    en: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ] as const,
    ru: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ] as const,
};
