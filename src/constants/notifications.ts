import { NotificationType } from '../types';

export interface NotificationTemplate {
    type: NotificationType;
    offsetMinutes: number; // negative = before bedtime, positive = after
    title: { en: string; ru: string };
    body: { en: string; ru: string };
    actions?: { id: string; title: { en: string; ru: string } }[];
}

export const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
    {
        type: 'dinner',
        offsetMinutes: -240, // bedtime - 4h
        title: {
            en: '🍽 Dinner Moment',
            ru: '🍽 Время ужина',
        },
        body: {
            en: 'Time for your last big meal. Eating earlier helps your body prepare for rest.',
            ru: 'Время для последнего приёма пищи. Ранний ужин поможет телу подготовиться ко сну.',
        },
    },
    {
        type: 'ritual_start',
        offsetMinutes: -60, // bedtime - 1h
        title: {
            en: '🌙 Begin Your Evening Ritual',
            ru: '🌙 Начните вечерний ритуал',
        },
        body: {
            en: 'Dim the lights, finish up work. Your body is starting to wind down.',
            ru: 'Приглушите свет, завершите дела. Ваше тело начинает готовиться ко сну.',
        },
    },
    {
        type: 'evening_care',
        offsetMinutes: -30, // bedtime - 30m
        title: {
            en: '✨ Evening Care',
            ru: '✨ Вечерний уход',
        },
        body: {
            en: 'Brush your teeth, wash your face. Small rituals signal your brain it\'s time to rest.',
            ru: 'Почистите зубы, умойтесь. Маленькие ритуалы сигнализируют мозгу, что пора отдыхать.',
        },
    },
    {
        type: 'digital_sunset',
        offsetMinutes: -20, // bedtime - 20m
        title: {
            en: '📱 Digital Sunset',
            ru: '📱 Цифровой закат',
        },
        body: {
            en: 'Put your phone away. Would you like to start a soundscape?',
            ru: 'Отложите телефон. Хотите включить звуковой фон?',
        },
        actions: [
            {
                id: 'play_music',
                title: { en: 'Begin Soundscape', ru: 'Включить звуки' },
            },
        ],
    },
    {
        type: 'final_moment',
        offsetMinutes: -10, // bedtime - 10m
        title: {
            en: '😌 Final Moment',
            ru: '😌 Последний момент',
        },
        body: {
            en: 'Lie down, close your eyes. Let go of the day. Sleep is near.',
            ru: 'Ложитесь, закройте глаза. Отпустите этот день. Сон уже близко.',
        },
        actions: [
            {
                id: 'went_to_bed',
                title: { en: 'I went to bed', ru: 'Я лёг спать' },
            },
        ],
    },
    {
        type: 'still_awake',
        offsetMinutes: 30, // bedtime + 30m
        title: {
            en: '🤔 Still awake?',
            ru: '🤔 Всё ещё не спите?',
        },
        body: {
            en: 'It\'s okay. Tomorrow is a new chance. Try to relax.',
            ru: 'Ничего страшного. Завтра — новый шанс. Постарайтесь расслабиться.',
        },
        actions: [
            {
                id: 'went_to_bed',
                title: { en: 'Going now', ru: 'Иду спать' },
            },
            {
                id: 'delay_1h',
                title: { en: 'Delay 1 hour', ru: 'Отложить на 1 час' },
            },
        ],
    },
];
