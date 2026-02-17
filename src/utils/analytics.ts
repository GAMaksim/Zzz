/**
 * Lightweight analytics helpers.
 * Can be expanded later with a real analytics service.
 */

export function logEvent(eventName: string, params?: Record<string, unknown>): void {
    if (__DEV__) {
        console.log(`[Analytics] ${eventName}`, params ?? '');
    }
    // TODO: Connect to analytics service (e.g. Firebase Analytics)
}

export function logScreenView(screenName: string): void {
    logEvent('screen_view', { screen: screenName });
}
