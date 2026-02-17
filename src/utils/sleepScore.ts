import { SleepScoreResult } from '../types';
import { COLORS } from '../constants/theme';

/**
 * Calculate Sleep Score based on planned bedtime.
 *
 * 21:00–22:30 → 90-100  "Excellent"  green
 * 22:30–23:00 → 78      "Good"       mauve
 * 23:00–00:00 → 65      "Fair"       orange/warning
 * after 00:00 → 40      "Poor"       red/error
 */
export function calculateSleepScore(bedtimeStr: string): SleepScoreResult {
    const [hours, minutes] = bedtimeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    // Normalize: times after midnight (00:00–05:00) are treated as next-day
    const normalizedMinutes = totalMinutes < 300 ? totalMinutes + 1440 : totalMinutes;

    // 21:00 = 1260, 22:30 = 1350, 23:00 = 1380, 00:00 = 1440
    if (normalizedMinutes >= 1260 && normalizedMinutes <= 1350) {
        // 21:00 – 22:30 → Excellent (90–100)
        const range = 1350 - 1260; // 90 min
        const position = normalizedMinutes - 1260;
        const score = Math.round(100 - (position / range) * 10); // 100 → 90
        return {
            score,
            rating: 'excellent',
            color: COLORS.success,
            recommendation: {
                en: 'Perfect bedtime! Your body will get optimal recovery during the deepest sleep phases.',
                ru: 'Идеальное время для сна! Ваше тело получит максимальное восстановление в фазах глубокого сна.',
            },
        };
    }

    if (normalizedMinutes > 1350 && normalizedMinutes <= 1380) {
        // 22:30 – 23:00 → Good (78)
        return {
            score: 78,
            rating: 'good',
            color: COLORS.softMauve,
            recommendation: {
                en: 'Good timing. You\'ll still get quality sleep, but slightly less deep recovery.',
                ru: 'Хорошее время. Вы всё ещё получите качественный сон, но немного меньше глубокого восстановления.',
            },
        };
    }

    if (normalizedMinutes > 1380 && normalizedMinutes <= 1440) {
        // 23:00 – 00:00 → Fair (65)
        return {
            score: 65,
            rating: 'fair',
            color: COLORS.warning,
            recommendation: {
                en: '⚠️ Late bedtime increases cortisol levels and reduces concentration the next day. Consider sleeping earlier.',
                ru: '⚠️ Поздний сон повышает уровень кортизола и снижает концентрацию на следующий день. Попробуйте лечь раньше.',
            },
        };
    }

    // After midnight → Poor (40)
    return {
        score: 40,
        rating: 'poor',
        color: COLORS.error,
        recommendation: {
            en: '✗ Sleeping after midnight significantly disrupts your circadian rhythm. Elevated cortisol, weakened immunity, reduced focus. Recommended: 22:30.',
            ru: '✗ Сон после полуночи значительно нарушает циркадный ритм. Повышенный кортизол, ослабленный иммунитет, сниженная концентрация. Рекомендуем: 22:30.',
        },
    };
}
