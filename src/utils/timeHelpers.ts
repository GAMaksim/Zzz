/**
 * Get the time remaining until bedtime as a formatted string.
 * e.g. "2:19" or "0:45"
 */
export function getTimeUntilBedtime(bedtimeStr: string): string {
    const now = new Date();
    const [hours, minutes] = bedtimeStr.split(':').map(Number);

    const bedtime = new Date();
    bedtime.setHours(hours, minutes, 0, 0);

    // If bedtime has already passed today, it means tomorrow
    if (bedtime.getTime() <= now.getTime()) {
        bedtime.setDate(bedtime.getDate() + 1);
    }

    const diffMs = bedtime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;

    return `${h}:${m.toString().padStart(2, '0')}`;
}

/**
 * Get progress toward bedtime as a number from 0.0 to 1.0.
 * Based on a "waking window" starting 16 hours before bedtime.
 */
export function getProgressTowardBedtime(bedtimeStr: string): number {
    const now = new Date();
    const [hours, minutes] = bedtimeStr.split(':').map(Number);

    const bedtime = new Date();
    bedtime.setHours(hours, minutes, 0, 0);

    // If bedtime has already passed today, it means tomorrow
    if (bedtime.getTime() <= now.getTime()) {
        bedtime.setDate(bedtime.getDate() + 1);
    }

    // Assume 16 hours waking window
    const wakingWindowMs = 16 * 60 * 60 * 1000;
    const wakeTime = new Date(bedtime.getTime() - wakingWindowMs);

    const totalWindowMs = bedtime.getTime() - wakeTime.getTime();
    const elapsedMs = now.getTime() - wakeTime.getTime();

    const progress = Math.max(0, Math.min(1, elapsedMs / totalWindowMs));
    return Math.round(progress * 100) / 100;
}

/**
 * Format a time string "HH:MM" for display.
 */
export function formatTime(timeStr: string): string {
    return timeStr;
}

/**
 * Parse "HH:MM" string into hours and minutes.
 */
export function parseTime(timeStr: string): { hours: number; minutes: number } {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
}

/**
 * Get today's day of week (0 = Sunday, 6 = Saturday).
 */
export function getTodayDayOfWeek(): number {
    return new Date().getDay();
}

/**
 * Check if the actual bedtime is "on time" (within 30 minutes of planned).
 */
export function isOnTime(
    plannedBedtime: string,
    actualBedtime: string,
): boolean {
    const planned = parseTime(plannedBedtime);
    const actual = parseTime(actualBedtime);

    const plannedMinutes = planned.hours * 60 + planned.minutes;
    const actualMinutes = actual.hours * 60 + actual.minutes;

    // Handle midnight crossing
    let diff = Math.abs(actualMinutes - plannedMinutes);
    if (diff > 720) {
        diff = 1440 - diff;
    }

    return diff <= 30;
}

/**
 * Get today's date as a formatted string "YYYY-MM-DD".
 */
export function getTodayDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
