import { SoundPreset } from '../types';

export const SOUND_PRESETS: SoundPreset[] = [
    // Free sounds
    {
        id: 'white_noise',
        name: 'White Noise',
        description: 'Gentle, consistent background noise for deep sleep',
        icon: '🌫️',
        file: 'white_noise.mp3',
        isPremium: false,
        mood: 'calm',
    },
    {
        id: 'rain',
        name: 'Rainfall',
        description: 'Soothing rain sounds to wash away the day',
        icon: '🌧️',
        file: 'rain.mp3',
        isPremium: false,
        mood: 'relaxed',
    },
    {
        id: 'ocean',
        name: 'Ocean Waves',
        description: 'Rhythmic waves lapping at the shore',
        icon: '🌊',
        file: 'ocean.mp3',
        isPremium: false,
        mood: 'peaceful',
    },
    // Premium sounds
    {
        id: 'fireplace',
        name: 'Fireplace',
        description: 'Warm, crackling fire for cozy nights',
        icon: '🔥',
        file: 'fireplace.mp3',
        isPremium: true,
        mood: 'cozy',
    },
    {
        id: 'forest',
        name: 'Forest Night',
        description: 'Crickets, gentle wind through the trees',
        icon: '🌲',
        file: 'forest.mp3',
        isPremium: true,
        mood: 'peaceful',
    },
    {
        id: 'piano',
        name: 'Soft Piano',
        description: 'Delicate piano melodies for winding down',
        icon: '🎹',
        file: 'piano.mp3',
        isPremium: true,
        mood: 'relaxed',
    },
    {
        id: 'meditation',
        name: 'Meditation',
        description: 'Ambient tones for mindful relaxation',
        icon: '🧘',
        file: 'meditation.mp3',
        isPremium: true,
        mood: 'calm',
    },
    {
        id: 'lullaby',
        name: 'Lullaby',
        description: 'Gentle melodies to drift off to sleep',
        icon: '🌙',
        file: 'lullaby.mp3',
        isPremium: true,
        mood: 'cozy',
    },
];

export const MOODS = ['calm', 'relaxed', 'peaceful', 'cozy'] as const;

export const MOOD_LABELS: Record<string, { en: string; ru: string }> = {
    calm: { en: 'Calm & Still', ru: 'Спокойствие' },
    relaxed: { en: 'Relaxed & Easy', ru: 'Расслабление' },
    peaceful: { en: 'Peaceful & Serene', ru: 'Умиротворение' },
    cozy: { en: 'Cozy & Warm', ru: 'Уют' },
};

export const AUDIO_STOP_TIMER_MINUTES = 60;
