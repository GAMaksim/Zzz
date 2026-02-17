import { SleepRecordData } from '../types';

/**
 * Calculate the current consecutive streak of on-time bedtimes
 * ending at today (or the most recent record).
 */
export function calculateCurrentStreak(records: SleepRecordData[]): number {
    if (records.length === 0) {
        return 0;
    }

    // Sort by date descending (most recent first)
    const sorted = [...records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    let streak = 0;
    for (const record of sorted) {
        if (record.wentToBedOnTime) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Calculate the longest consecutive streak of on-time bedtimes
 * across all records.
 */
export function calculateLongestStreak(records: SleepRecordData[]): number {
    if (records.length === 0) {
        return 0;
    }

    // Sort by date ascending
    const sorted = [...records].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    let longest = 0;
    let current = 0;

    for (const record of sorted) {
        if (record.wentToBedOnTime) {
            current++;
            if (current > longest) {
                longest = current;
            }
        } else {
            current = 0;
        }
    }

    return longest;
}

/**
 * Check which achievements are unlocked.
 * 7 days, 30 days, 90 days streak achievements.
 */
export function getUnlockedAchievements(
    longestStreak: number,
): { days: number; unlocked: boolean }[] {
    return [
        { days: 7, unlocked: longestStreak >= 7 },
        { days: 30, unlocked: longestStreak >= 30 },
        { days: 90, unlocked: longestStreak >= 90 },
    ];
}
