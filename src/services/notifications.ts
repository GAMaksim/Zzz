// Placeholder — will be implemented in Этап 3
export async function setupNotificationChannel(): Promise<void> {
    // TODO: Android notification channel setup
}

export async function requestNotificationPermission(): Promise<boolean> {
    // TODO: Request notification permissions
    return false;
}

export async function scheduleNotificationsForDay(
    _dayOfWeek: number,
    _bedtime: string,
): Promise<void> {
    // TODO: Schedule 6 push notifications
}

export async function cancelNotificationsForDay(
    _dayOfWeek: number,
): Promise<void> {
    // TODO: Cancel scheduled notifications
}
