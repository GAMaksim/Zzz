// Zzz Design System — CLAUDE.md spec
export const COLORS = {
    deepIndigo: '#2d3561',
    softMauve: '#b8a9c9',
    warmSand: '#e8d5c4',
    goldAccent: '#d4af37',
    cream: '#faf8f5',
    whisperGray: '#e5e3df',
    textPrimary: '#1a1a1a',
    textSecondary: '#6b6b6b',
    success: '#7ba88d',
    warning: '#c9a88b',
    error: '#c96b6b',
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0,0,0,0.5)',
} as const;

export const FONTS = {
    heading: 'Cormorant Garamond',
    body: 'Inter',
} as const;

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
    hero: 48,
} as const;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
} as const;

export const SHADOWS = {
    small: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    large: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
    },
} as const;

export const ANIMATION = {
    duration: {
        fast: 200,
        normal: 400,
        slow: 600,
    },
} as const;
